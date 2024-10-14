package com.pp.productivity_pal.leetcode_data;

import java.util.List;

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
    public void addNewProblem(@RequestBody Problem problem) {
        problemService.addNewProblem(problem);
    }

    @DeleteMapping(path = "{l_id}")
    public void deleteProblem(@PathVariable("l_id") Long l_id) {
        problemService.deleteProblem(l_id);
    }

    @PutMapping(path = "{l_id}")
    public void updateProblem(@PathVariable("l_id") Long l_id,
        @RequestParam(required = false) String notes,
        @RequestParam(required = false) String status) {
            problemService.updateProblem(l_id, notes, status);
        }

}