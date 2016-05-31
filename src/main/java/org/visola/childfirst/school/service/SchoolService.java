package org.visola.childfirst.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.visola.childfirst.school.model.School;
import org.visola.childfirst.school.repository.SchoolRepository;

@Service
public class SchoolService {

  private final SchoolRepository schoolRepository;

  @Autowired
  public SchoolService(SchoolRepository schoolRepository) {
    this.schoolRepository = schoolRepository;
  }

  public Iterable<School> findAll() {
    return schoolRepository.findAll();
  }

  public School findOne(Integer schoolId) {
    return schoolRepository.findOne(schoolId);
  }

}
