package org.visola.childfirst.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.exception.ResourceNotFoundException;
import org.visola.childfirst.school.model.Branch;
import org.visola.childfirst.school.model.School;
import org.visola.childfirst.school.service.BranchService;
import org.visola.childfirst.school.service.SchoolService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RequestMapping("${api.base.path}/branches")
@RestController
public class BranchesController {

  private final BranchService branchService;
  private final SchoolService schoolService;

  @Autowired
  public BranchesController(BranchService branchService, SchoolService schoolService) {
    this.branchService = branchService;
    this.schoolService = schoolService;
  }

  @RequestMapping(method=RequestMethod.GET)
  public Iterable<Branch> getBranches() {
    return branchService.findAll();
  }

  @RequestMapping(value="/{id}", method=RequestMethod.GET)
  public Branch getBranch(@PathVariable("id") Integer branchId) {
    return branchService.findOne(branchId);
  }

  @RequestMapping(method=RequestMethod.POST)
  public Branch createBranch(@RequestBody Branch branch, @AuthenticationPrincipal User user) {
    return setSchoolAndSave(branch, user);
  }

  @RequestMapping(method=RequestMethod.PUT, value="/{id}")
  @ResponseBody
  public Branch updateBranch(@PathVariable("id") Integer branchId, @RequestBody Branch branch, @AuthenticationPrincipal User user) {
    branch.setId(branchId);

    return setSchoolAndSave(branch, user);
  }

  private Branch setSchoolAndSave(Branch branch, User user) {
    Integer schoolId = branch.getSchool().getId();
    School loadedSchool = schoolService.findOne(schoolId);
    branch.setSchool(loadedSchool);

    return branchService.save(branch, user);
  }

}
