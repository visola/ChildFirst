package org.visola.childfirst.auth.controller;

import java.text.ParseException;
import java.util.Date;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.visola.childfirst.auth.model.User;
import org.visola.spring.security.tokenfilter.jwt.AuthenticationJwtClaimsSetTransformer;

import com.nimbusds.jwt.JWTClaimsSet;

@Component("claimsSetTransformer")
public class UserAuthenticationJwtClaimsSetTransformer implements AuthenticationJwtClaimsSetTransformer {

  private static final String CLAIM_ID = "user_id";
  private static final String CLAIM_LAST_NAME = "lastName";
  private static final String CLAIM_FIRST_NAME = "firstName";
  private static final String CLAIM_IS_ADMIN = "isAdmin";
  private final static int TOKEN_DURATION = 3600000;

  @Override
  public JWTClaimsSet getClaimsSet(Authentication auth) {
    User user = (User) auth.getPrincipal();
    long now = System.currentTimeMillis();

    return new JWTClaimsSet.Builder()
      .subject(user.getUsername())
      .issueTime(new Date(now))
      .expirationTime(new Date(now + TOKEN_DURATION))
      .claim(CLAIM_ID, user.getId())
      .claim(CLAIM_IS_ADMIN, user.isAdmin())
      .claim(CLAIM_FIRST_NAME, user.getFirstName())
      .claim(CLAIM_LAST_NAME, user.getLastName())
      .build();
  }

  @Override
  public Authentication getAuthentication(JWTClaimsSet claimSet) {
    User user = new User();
    user.setEmail(claimSet.getSubject());

    try {
      user.setId(claimSet.getIntegerClaim(CLAIM_ID));
      user.setAdmin(claimSet.getBooleanClaim(CLAIM_IS_ADMIN));
      user.setFirstName(claimSet.getStringClaim(CLAIM_FIRST_NAME));
      user.setLastName(claimSet.getStringClaim(CLAIM_LAST_NAME));
    } catch (ParseException e) {
      throw new RuntimeException("Error while parsing claim set", e);
    }

    return new UsernamePasswordAuthenticationToken(user, "");
  }

}
