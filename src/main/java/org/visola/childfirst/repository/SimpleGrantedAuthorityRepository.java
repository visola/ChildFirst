package org.visola.childfirst.repository;

import java.util.Set;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.visola.childfirst.model.SimpleGrantedAuthority;

public interface SimpleGrantedAuthorityRepository extends PagingAndSortingRepository<SimpleGrantedAuthority, Integer> {

  Set<SimpleGrantedAuthority> findByAuthorityIn(String... authorities);

}
