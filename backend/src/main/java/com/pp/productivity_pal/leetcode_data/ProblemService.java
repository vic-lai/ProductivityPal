package com.pp.productivity_pal.leetcode_data;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getProblems() {
		return problemRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
	}

    public void addNewProblem(Problem problem) {
        problemRepository.save(problem);
    }

    public void deleteProblem(Long id) {
        boolean exists = problemRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException(
                "problem with id " + id + " does not exist");  
        }
        problemRepository.deleteById(id);
    }

    @Transactional
    public void updateProblem(Long id, String notes, String status, String difficulty, String name, String link, String type) {
        Problem problem = problemRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException(
                "Problem with id " + id + " does not exist"
            ));
        System.out.println("updating " + notes + status + difficulty + name + link + type);
        if (notes != null && !Objects.equals(problem.getNotes(), notes)) {
            problem.setNotes(notes);
        }

        if (status != null && status.length() > 0 && !Objects.equals(problem.getStatus(), status)) {
            problem.setStatus(status);
        }

        if (difficulty != null && difficulty.length() > 0 && !Objects.equals(problem.getDifficulty(), difficulty)) {
            problem.setDifficulty(difficulty);
        }

        if (name != null && name.length() > 0 && !Objects.equals(problem.getName(), name)) {
            problem.setName(name);
        }
        
        if (link != null && link.length() > 0 && !Objects.equals(problem.getLink(), link)) {
            problem.setLink(link);
        }

        if (type != null && type.length() > 0 && !Objects.equals(problem.getType(), type)) {
            problem.setType(type);
        }

    }
}