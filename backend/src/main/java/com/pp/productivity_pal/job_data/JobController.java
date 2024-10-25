package com.pp.productivity_pal.job_data;

import java.util.List;
import java.time.LocalDate;

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
@RequestMapping(path="api/v1/jobapplications")
public class JobController {

    private final JobService jobService;

    public JobController(JobService JobService) {
        this.jobService = JobService;
    }

    @GetMapping
    public List<Job> leetcodeJobs() {
        return jobService.getJobs();
	}

    @PostMapping
    public Job addNewjob(@RequestBody Job job) {
        jobService.addNewJob(job);
        return job;
    }

    @DeleteMapping(path = "{id}")
    public List<Job> deleteJob(@PathVariable("id") Long id) {
        jobService.deleteJob(id);
        return jobService.getJobs();
    }

    @PutMapping(path = "{id}")
    public List<Job> updateJob(@PathVariable("id") Long id,
        @RequestParam(required = false) String jobTitle,
        @RequestParam(required = false) String company,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) LocalDate date,
        @RequestParam(required = false) String notes) {
            jobService.updateJob(id, jobTitle, company, status, date, notes);
            return jobService.getJobs();
        }

}