package org.visola.childfirst.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.exception.ResourceNotFoundException;
import org.visola.childfirst.school.model.Branch;
import org.visola.childfirst.school.repository.BranchRepository;

import java.util.Calendar;

@Service
public class BranchService {

  private final BranchRepository branchRepository;

  @Autowired
  public BranchService(BranchRepository branchRepository) {
    this.branchRepository = branchRepository;
  }

  public Iterable<Branch> findAll() {
    return branchRepository.findAll();
  }

  public Branch findOne(Integer id) {
    return branchRepository.findOne(id);
  }

  public Branch save(Branch branch, User user) {
    if (branch == null) {
      branch = new Branch();
    }

    Calendar now = Calendar.getInstance();

    if (branch.getId() == null) {
      branch.setCreated(now);
      branch.setCreatedBy(user.getId());
    } else {
      Branch loadedBranch = branchRepository.findOne(branch.getId());
      if (loadedBranch == null) {
        throw new ResourceNotFoundException("Branch with ID " + branch.getId() + " not found.");
      }
      branch.setCreated(loadedBranch.getCreated());
      branch.setCreatedBy(loadedBranch.getCreatedBy());
    }

    branch.setUpdated(now);
    branch.setUpdatedBy(user.getId());

    return branchRepository.save(branch);
  }

}
