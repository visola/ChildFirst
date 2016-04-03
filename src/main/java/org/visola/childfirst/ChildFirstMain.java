package org.visola.childfirst;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ChildFirstMain {

  public static void main (String [] args) {
    SpringApplication.run(ChildFirstMain.class, args);
  }

  @Bean
  public HttpClient httpClient() {
    return HttpClients.createDefault();
  }

}