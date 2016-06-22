package org.visola.childfirst.school.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.visola.childfirst.school.model.Branch;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("${api.base.path}/branches")
@RestController
public class BranchesController {

  @RequestMapping(method=RequestMethod.GET)
  public List<Branch> getBranches() {
    return new ArrayList<>();
  }

}
