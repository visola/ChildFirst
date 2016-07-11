package org.visola.childfirst.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.exception.ResourceNotFoundException;
import org.visola.childfirst.school.model.School;
import org.visola.childfirst.school.repository.SchoolRepository;

import java.util.Calendar;

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

  public School save(School school, User user) {
    if (school == null) {
      school = new School();
    }

    Calendar now = Calendar.getInstance();

    if (school.getId() == null) {
      school.setCreated(now);
      school.setCreatedBy(user.getId());
    } else {
      School loadedSchool = schoolRepository.findOne(school.getId());
      if (loadedSchool == null) {
        throw new ResourceNotFoundException("School with ID " + school.getId() + " not found.");
      }
      school.setCreated(loadedSchool.getCreated());
      school.setCreatedBy(loadedSchool.getCreatedBy());
    }

    school.setUpdated(now);
    school.setUpdatedBy(user.getId());

    return schoolRepository.save(school);
  }

}
