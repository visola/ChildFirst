package org.visola.childfirst.auth.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class User implements UserDetails {

  private static final long serialVersionUID = 1L;
  private static final List<? extends GrantedAuthority> EMPTY_LIST = new ArrayList<>();

  @GeneratedValue
  @Id
  private Integer id;

  private String email;
  private Calendar expiresOn;
  private Calendar lockedOn;
  private Calendar disabled;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return EMPTY_LIST;
  }

  public Calendar getDisabled() {
    return disabled;
  }

  public String getEmail() {
    return email;
  }

  public Calendar getExpiresOn() {
    return expiresOn;
  }

  public Integer getId() {
    return id;
  }

  public Calendar getLockedOn() {
    return lockedOn;
  }

  @Override
  public String getPassword() {
    return "";
  }

  @Override
  public String getUsername() {
    return getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return expiresOn == null || expiresOn.before(Calendar.getInstance());
  }

  @Override
  public boolean isAccountNonLocked() {
    return lockedOn == null || lockedOn.before(Calendar.getInstance());
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return disabled == null || disabled.after(Calendar.getInstance());
  }

  public void setDisabled(Calendar disabled) {
    this.disabled = disabled;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setExpiresOn(Calendar expiresOn) {
    this.expiresOn = expiresOn;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setLockedOn(Calendar lockedOn) {
    this.lockedOn = lockedOn;
  }

}
