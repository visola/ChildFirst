package org.visola.childfirst.repository;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.visola.childfirst.model.User;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}
