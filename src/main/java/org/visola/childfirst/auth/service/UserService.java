package org.visola.childfirst.auth.service;

import java.util.Calendar;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.auth.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: "+username));
  }

  public Iterable<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(Integer id) {
    return userRepository.findOne(id);
  }

  public Optional<User> findUser(String email) {
    return userRepository.findByEmail(email);
  }

  public User createDefaultUser(String email) {
    User user = new User();
    user.setEmail(email);

    return userRepository.save(user);
  }

  public User save(User toSave, User author) {
    if (toSave.getId() == null) {
      toSave.setCreated(Calendar.getInstance());
      toSave.setCreatedBy(author.getId());
    } else {
      User loaded = userRepository.findOne(toSave.getId());
      toSave.setCreatedBy(loaded.getCreatedBy());
      toSave.setCreated(loaded.getCreated());
    }
    toSave.setUpdated(Calendar.getInstance());
    toSave.setUpdatedBy(author.getId());
    return userRepository.save(toSave);
  }

}
