package org.visola.childfirst.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class SimpleGrantedAuthority implements GrantedAuthority {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Integer id;

  private String authority;

  public SimpleGrantedAuthority() {
  }

  public SimpleGrantedAuthority(String authority) {
    super();
    this.authority = authority;
  }

  public String getAuthority() {
    return authority;
  }

  public Integer getId() {
    return id;
  }

  public void setAuthority(String authority) {
    this.authority = authority;
  }

  public void setId(Integer id) {
    this.id = id;
  }

}
