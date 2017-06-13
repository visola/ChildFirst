package org.visola.childfirst.auth.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.visola.childfirst.auth.model.User;
import org.visola.childfirst.auth.service.UserService;

@RequestMapping("${api.base.path}/users")
@RestController
public class UsersController {

  private final UserService userService;

  @Autowired
  public UsersController(UserService userService) {
    this.userService = userService;
  }

  @RequestMapping(method=RequestMethod.GET)
  public Iterable<User> getUsers() {
    return userService.findAll();
  }

  @RequestMapping(method=RequestMethod.GET, value="/{id}")
  public User getUserById(@PathVariable("id") Integer id) {
    return userService.findById(id);
  }

  @RequestMapping(method=RequestMethod.POST)
  public User createUser(@RequestBody User user, @AuthenticationPrincipal User loggedIn) {
    user.setAdmin(false); // No one can create admins for now
    return userService.save(user, loggedIn);
  }

  @RequestMapping(method=RequestMethod.PUT, value="/{id}")
  public ResponseEntity<User> updateUser(@PathVariable("id") Integer id, @RequestBody User user, @AuthenticationPrincipal User loggedIn) {
    if (!Objects.equals(id, user.getId())) {
      return ResponseEntity.badRequest().body(null);
    }
    user.setAdmin(false); // No one can create admins for now
    return ResponseEntity.ok(userService.save(user, loggedIn));
  }

}
