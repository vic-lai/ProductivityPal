package com.pp.productivity_pal.job_data;


import java.util.List;
import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getJobs() {
		return jobRepository.findAll(Sort.by(Sort.Direction.ASC, "jId"));
	}

    public void addNewJob(Job Job) {
        jobRepository.save(Job);
    }

    public void deleteJob(Long id) {
        boolean exists = jobRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException(
                "Job with id " + id + " does not exist");  
        }
        jobRepository.deleteById(id);
    }

    
    @Transactional
    public void updateJob(Long id, String jobTitle, String company, String status, LocalDate date, String notes) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new IllegalStateException(
                "Job with id " + id + " does not exist"
            ));
        if (jobTitle != null && jobTitle.length() > 0 && !Objects.equals(job.getJobTitle(), jobTitle)) {
            job.setJobTitle(jobTitle);
        }

        if (company != null && company.length() > 0 && !Objects.equals(job.getCompany(), company)) {
            job.setCompany(company);
        }

        if (status != null && status.length() > 0 && !Objects.equals(job.getStatus(), status)) {
            job.setStatus(status);
        }

        if (date != null && !Objects.equals(job.getDate(), date)) {
            job.setDate(date);
        }

        if (!Objects.equals(job.getNotes(), notes)) {
            job.setNotes(notes);
        }
    }
}