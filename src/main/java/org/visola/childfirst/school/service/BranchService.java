package org.visola.childfirst.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.visola.childfirst.school.model.Branch;
import org.visola.childfirst.school.repository.BranchRepository;

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

}
