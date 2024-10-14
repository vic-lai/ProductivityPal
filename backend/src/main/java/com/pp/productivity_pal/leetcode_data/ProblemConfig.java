package com.pp.productivity_pal.leetcode_data;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProblemConfig {

    @Bean
    CommandLineRunner commandLineRunner(ProblemRepository repository) {
        return args -> {
            Problem dupe = new Problem("Easy", "Contains Duplicate", "", "Arrays & Hashing", "completed", "https://leetcode.com/problems/contains-duplicate/");
            Problem valid = new Problem("Easy", "Valid Anagram", "", "Arrays & Hashing", "completed", "https://leetcode.com/problems/valid-anagram/description/");

            repository.saveAll(List.of(dupe,valid));
        };
    }
}