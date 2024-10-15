package com.pp.productivity_pal.job_data;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Job {

    @Id
    @SequenceGenerator(
        name="job_sequence",
        sequenceName= "job_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "job_sequence"
    )
    private long jId;
    private String jobTitle;
    private String company;
    private String status;
    private LocalDate date;
    private String notes;
    
    public Job() {
    }

    public Job(long jId, String jobTitle, String company, String status, LocalDate date, String notes) {
        this.jId = jId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.status = status;
        this.date = date;
        this.notes = notes;
    }

    public Job(String jobTitle, String company, String status, LocalDate date, String notes) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.status = status;
        this.date = date;
        this.notes = notes;
    }

    public long getjId() {
        return jId;
    }

    public void setjId(long jId) {
        this.jId = jId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    

    

}