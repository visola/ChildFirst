package org.visola.childfirst.school.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Calendar;

@Entity
public class Branch {

  @GeneratedValue
  @Id
  private Integer id;
  private String name;

  private Calendar created;
  private int createdBy;
  private Calendar updated;
  private int updatedBy;

  @ManyToOne
  private School school;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public School getSchool() {
    return school;
  }

  public void setSchool(School school) {
    this.school = school;
  }

  public Calendar getCreated() {
    return created;
  }

  public void setCreated(Calendar created) {
    this.created = created;
  }

  public int getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(int createdBy) {
    this.createdBy = createdBy;
  }

  public Calendar getUpdated() {
    return updated;
  }

  public void setUpdated(Calendar updated) {
    this.updated = updated;
  }

  public int getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(int updatedBy) {
    this.updatedBy = updatedBy;
  }

}
