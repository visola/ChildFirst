package org.visola.childfirst.school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.visola.childfirst.school.model.Branch;
import org.visola.childfirst.school.service.BranchService;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("${api.base.path}/branches")
@RestController
public class BranchesController {

  private final BranchService branchService;

  @Autowired
  public BranchesController(BranchService branchService) {
    this.branchService = branchService;
  }

  @RequestMapping(method=RequestMethod.GET)
  public Iterable<Branch> getBranches() {
    return branchService.findAll();
  }

  @RequestMapping(value="/{id}", method=RequestMethod.GET)
  public Branch getBranch(@PathVariable("id") Integer branchId) {
    return branchService.findOne(branchId);
  }

}
