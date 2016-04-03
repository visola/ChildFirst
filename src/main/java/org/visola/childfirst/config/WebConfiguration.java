package org.visola.childfirst.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // All resources go to where they should go
    registry
      .addResourceHandler("/**/*.css", "/**/*.html", "**/*.jade", "/**/*.js", "/**/*.jsx", "/**/*.ttf", "/**/*.woff", "/**/*.woff2")
      .addResourceLocations("classpath:/static/");

    // Anything else, goes to index.html
    registry
      .addResourceHandler("/", "/**")
      .addResourceLocations("classpath:/static/index.html").resourceChain(true)
      .addResolver(new PathResourceResolver() {
        @Override
        protected Resource getResource(String resourcePath, Resource location) throws IOException {
          return location.exists() && location.isReadable() ? location : null;
        }
      });
  }

}
