package org.visola.childfirst.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.visola.childfirst.school.model.School;
import org.visola.childfirst.school.service.SchoolService;

@RequestMapping("${api.base.path}/schools")
@RestController
public class SchoolsController {

  private final SchoolService schoolService;
  
  @Autowired
  public SchoolsController(SchoolService schoolService) {
    this.schoolService = schoolService;
  }

  @RequestMapping(method=RequestMethod.GET)
  public Iterable<School> getSchools() {
    return schoolService.findAll();
  }

}
