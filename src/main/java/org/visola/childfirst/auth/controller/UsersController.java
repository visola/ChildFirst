package org.visola.childfirst.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

  @RequestMapping(method= RequestMethod.GET)
  public Iterable<User> getUsers() {
    return userService.findAll();
  }

}
