package org.visola.childfirst.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.visola.childfirst.model.SimpleGrantedAuthority;
import org.visola.childfirst.model.User;
import org.visola.childfirst.repository.SimpleGrantedAuthorityRepository;
import org.visola.childfirst.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final Set<SimpleGrantedAuthority> defaultAuthorities;

  @Autowired
  public UserService(SimpleGrantedAuthorityRepository simpleGrantedAuthorityRepository,
                     UserRepository userRepository) {
    this.userRepository = userRepository;
    this.defaultAuthorities = simpleGrantedAuthorityRepository.findByAuthorityIn("ROLE_PARENT");
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: "+username));
  }

  public Optional<User> findUser(String email) {
    return userRepository.findByEmail(email);
  }

  public User createDefaultUser(String email) {
    User user = new User();
    user.setEmail(email);
    user.setAuthorities(defaultAuthorities);

    return userRepository.save(user);
  }

}
