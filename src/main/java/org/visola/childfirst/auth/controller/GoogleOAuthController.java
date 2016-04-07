package org.visola.childfirst.auth.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Consts;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.auth.service.UserService;
import org.visola.spring.security.tokenfilter.TokenService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class GoogleOAuthController {

  private static final int ONE_MINUTE = 60;
  private static final String CSRF_TOKEN_COOKIE_NAME = "CSRFTOKEN";
  private static final String UTF8 = "utf8";
  private static final String GOOGLE_OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/auth";
  private static final String GOOGLE_TOKEN_ENDPOINT = "https://www.googleapis.com/oauth2/v3/token";
  private static final String GOOGLE_EMAIL_ENDPOINT = "https://www.googleapis.com/plus/v1/people/me";

  @Autowired
  HttpClient httpClient;

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  TokenService tokenService;

  @Autowired
  UserService userService;

  @Value("${oauth.google.clientId}")
  String clientId;

  @Value("${oauth.google.clientSecret}")
  String clientSecret;

  @Value("${oauth.google.redirectUri}")
  String redirectUri;

  @Value("${oauth.google.scopes}")
  String scopes;

  @RequestMapping(method=RequestMethod.GET, value="/authenticate/google")
  public String redirectToGoogle(String path, HttpServletResponse response) throws UnsupportedEncodingException {
    // Set CSRF token
    String csrfToken = UUID.randomUUID().toString();
    response.addCookie(createCsrfTokenCookie(csrfToken, ONE_MINUTE));

    StringBuffer uri = new StringBuffer("redirect:");
    uri.append(GOOGLE_OAUTH_ENDPOINT);
    uri.append("?response_type=code&scope=");
    uri.append(URLEncoder.encode(scopes, UTF8));
    uri.append("&client_id=");
    uri.append(URLEncoder.encode(clientId, UTF8));
    uri.append("&redirect_uri=");
    uri.append(URLEncoder.encode(redirectUri, UTF8));
    uri.append("&state=");
    // In the state we send the CSRF token and the page the user originally wanted to go
    uri.append(URLEncoder.encode(String.format("%s||%s", csrfToken, path), UTF8));
    return uri.toString();
  }

  @RequestMapping(method=RequestMethod.GET, value="/authenticate/oauth2callback")
  public ModelAndView receiveRedirect(
      String code,
      String state,
      HttpServletResponse response,
      @CookieValue(CSRF_TOKEN_COOKIE_NAME) String csrfToken) throws Exception {

    // Remove CSRF token
    response.addCookie(createCsrfTokenCookie(null, 0));

    // State stores CSRF token and path
    String[] split = state.split("\\|\\|");

    String stateCsrf = split[0];
    if (!csrfToken.equals(stateCsrf)) {
      throw new AccessDeniedException("Invalid CSRF token.");
    }

    ModelAndView mv = new ModelAndView("oauth2callback");

    String email = getUserEmail(getToken(code));

    Optional<User> maybeUser = userService.findUser(email);
    User user;
    if (!maybeUser.isPresent()) {
      user = userService.createDefaultUser(email);
    } else {
      user = maybeUser.get();
    }

    mv.addObject("token", tokenService.generateToken(new UsernamePasswordAuthenticationToken(user, "")));
    mv.addObject("path", split[1]);
    return mv;
  }

  private String getUserEmail(String token) throws Exception {
    HttpGet get = new HttpGet(GOOGLE_EMAIL_ENDPOINT);
    get.addHeader("Authorization", String.format("Bearer %s", token));

    HttpResponse response = httpClient.execute(get);
    JsonNode node = objectMapper.readTree(response.getEntity().getContent());
    for (JsonNode email : node.get("emails")) {
      if (email.get("type").asText().equals("account")) {
        return email.get("value").asText();
      }
    }

    throw new RuntimeException("Can't find user email.");
  }

  private String getToken(String code) throws Exception {
    List<NameValuePair> formParams = new ArrayList<>();
    formParams.add(new BasicNameValuePair("code", code));
    formParams.add(new BasicNameValuePair("client_id", clientId));
    formParams.add(new BasicNameValuePair("client_secret", clientSecret));
    formParams.add(new BasicNameValuePair("redirect_uri", redirectUri));
    formParams.add(new BasicNameValuePair("grant_type", "authorization_code"));

    HttpPost post = new HttpPost(GOOGLE_TOKEN_ENDPOINT);
    post.setEntity(new UrlEncodedFormEntity(formParams, Consts.UTF_8));
    HttpResponse response = httpClient.execute(post);

    if (response.getStatusLine().getStatusCode() >= 200 && response.getStatusLine().getStatusCode() < 300) {
      JsonNode node = objectMapper.readTree(response.getEntity().getContent());
      return node.get("access_token").asText();
    } else {
      throw new RuntimeException(String.format("Error while fetching token from Google. Status: %d, Response: %s", response.getStatusLine().getStatusCode(), response.getStatusLine().getReasonPhrase()));
    }
  }

  private Cookie createCsrfTokenCookie(String csrfToken, int age) {
    Cookie cookie = new Cookie(CSRF_TOKEN_COOKIE_NAME, csrfToken);
    cookie.setMaxAge(age);
    return cookie;
  }

}
