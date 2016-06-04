package org.visola.childfirst.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.visola.childfirst.auth.service.UserService;
import org.visola.spring.security.tokenfilter.TokenAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled=true)
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  private TokenAuthenticationFilter tokenAuthenticationFilter;

  @Autowired
  private UserService userService;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // This will make your app completely stateless
    http.csrf().disable().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // Add the TokenAuthenticationFilter to your filter chain
    http.addFilterBefore(tokenAuthenticationFilter,
        BasicAuthenticationFilter.class);

    http.authorizeRequests()
      .antMatchers("/api/v1/**").authenticated();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userService);
  }

}
