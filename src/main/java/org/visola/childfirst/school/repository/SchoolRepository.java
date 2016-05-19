package org.visola.childfirst.school.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.visola.childfirst.school.model.School;

public interface SchoolRepository extends PagingAndSortingRepository<School, Integer> {

}
