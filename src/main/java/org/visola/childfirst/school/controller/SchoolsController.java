package org.visola.childfirst.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

  @RequestMapping(method=RequestMethod.GET, value="/{id}")
  public School getSchool(@PathVariable("id") Integer id) {
    return schoolService.findOne(id);
  }

  @RequestMapping(method=RequestMethod.PUT, value="/{id}")
  public School updateSchool(@RequestBody School school) {
    return schoolService.save(school);
  }

}
