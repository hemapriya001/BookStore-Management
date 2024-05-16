package com.project.bookStore.config;

import com.project.bookStore.authentication.MyCustomFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public MyCustomFilter getFilter(){
        return new MyCustomFilter();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.addFilterBefore(getFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.authorizeHttpRequests(request -> request
                        .anyRequest()
                        .permitAll())
                .httpBasic(Customizer.withDefaults())
                .csrf().disable()
                .build();
    }
}
