package com.pp.productivity_pal.leetcode_data;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins= "*")
@RequestMapping(path="api/v1/leetcodeproblems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }
    @GetMapping
    public List<Problem> leetcodeproblems() {
        return problemService.getProblems();
	}

    @PostMapping
    public Problem addNewProblem(@RequestBody Problem problem) {
        problemService.addNewProblem(problem);
        return problem;
    }

    @DeleteMapping(path = "{id}")
    public List<Problem> deleteProblem(@PathVariable("id") Long id) {
        problemService.deleteProblem(id);
        return problemService.getProblems();
    }

    @PutMapping(path = "{id}")
    public List<Problem> updateProblem(@PathVariable("id") Long id,
        @RequestParam(required = false) String notes,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String difficulty,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String link,
        @RequestParam(required = false) String type) {
            problemService.updateProblem(id, notes, status, difficulty, name, link, type);
            return problemService.getProblems();
        }
}