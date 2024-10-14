package com.pp.productivity_pal.leetcode_data;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getProblems() {
		return problemRepository.findAll();
	}

    public void addNewProblem(Problem problem) {
        problemRepository.save(problem);
    }

    public void deleteProblem(Long l_id) {
        boolean exists = problemRepository.existsById(l_id);
        if (!exists) {
            throw new IllegalStateException(
                "problem with id " + l_id + " does not exist");  
        }
        problemRepository.deleteById(l_id);
    }

    @Transactional
    public void updateProblem(Long l_id, String notes, String status) {
        Problem problem = problemRepository.findById(l_id)
            .orElseThrow(() -> new IllegalStateException(
                "student with id " + l_id + " does not exist"
            ));
        
        if (notes != null && !Objects.equals(problem.getNotes(), notes)) {
            problem.setNotes(notes);
        }

        if (status != null && status.length() > 0 && !Objects.equals(problem.getStatus(), status)) {
            problem.setStatus(status);
        }

    }
}