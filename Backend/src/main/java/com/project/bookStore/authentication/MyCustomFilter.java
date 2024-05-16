package com.project.bookStore.authentication;

import com.project.bookStore.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.util.CollectionUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

import com.project.bookStore.utils.Constants;

@Slf4j
public class MyCustomFilter extends OncePerRequestFilter {

    @Autowired
    UserService userService;


    private boolean validateURLType(String requestURI, String urlType){
        List<String> urlList = urlType.equalsIgnoreCase("admin")
                ? Constants.ADMIN_URLS
                : Constants.PUBLIC_URLS;
        List<String> foundList = urlList.stream().filter(requestURI::startsWith).toList();
        return !CollectionUtils.isEmpty(foundList);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (validateURLType(request.getRequestURI(), "public")){
            filterChain.doFilter(request, response);
        }
        else{
            try {
                Long userId = Long.valueOf(request.getHeader("user-id"));
                if (validateURLType(request.getRequestURI(), "admin"))
                    if (!userService.isAdmin(userId)){
                        throw new AccessDeniedException("Unauthorized");
                    }
                filterChain.doFilter(request, response);
            } catch (Exception e){
                log.error(e.getLocalizedMessage());
                response.sendError(401, "Unauthorized");
            }
        }

    }
}
