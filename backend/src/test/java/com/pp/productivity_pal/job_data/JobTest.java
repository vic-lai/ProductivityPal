package com.pp.productivity_pal.job_data;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class JobTest {

    private Job job;

    @BeforeEach
    public void setUp() {
        job = new Job(1L, "Software Engineer", "Tech Company", "Applied", LocalDate.of(2024, 10, 23), "Initial application submitted");
    }

    @Test
    public void testConstructorWithId() {
        assertEquals(1L, job.getjId());
        assertEquals("Software Engineer", job.getJobTitle());
        assertEquals("Tech Company", job.getCompany());
        assertEquals("Applied", job.getStatus());
        assertEquals(LocalDate.of(2024, 10, 23), job.getDate());
        assertEquals("Initial application submitted", job.getNotes());
    }

    @Test
    public void testConstructorWithoutId() {
        Job jobWithoutId = new Job("Data Analyst", "Data Corp", "Interview", LocalDate.of(2024, 11, 5), "Scheduled interview");
        assertEquals("Data Analyst", jobWithoutId.getJobTitle());
        assertEquals("Data Corp", jobWithoutId.getCompany());
        assertEquals("Interview", jobWithoutId.getStatus());
        assertEquals(LocalDate.of(2024, 11, 5), jobWithoutId.getDate());
        assertEquals("Scheduled interview", jobWithoutId.getNotes());
    }

    @Test
    public void testSettersAndGetters() {
        job.setjId(2L);
        job.setJobTitle("Product Manager");
        job.setCompany("Business Solutions");
        job.setStatus("Offer");
        job.setDate(LocalDate.of(2024, 12, 15));
        job.setNotes("Job offer received");

        assertEquals(2L, job.getjId());
        assertEquals("Product Manager", job.getJobTitle());
        assertEquals("Business Solutions", job.getCompany());
        assertEquals("Offer", job.getStatus());
        assertEquals(LocalDate.of(2024, 12, 15), job.getDate());
        assertEquals("Job offer received", job.getNotes());
    }

    @Test
    public void testEmptyConstructor() {
        Job emptyJob = new Job();
        assertNull(emptyJob.getJobTitle());
        assertNull(emptyJob.getCompany());
        assertNull(emptyJob.getStatus());
        assertNull(emptyJob.getDate());
        assertNull(emptyJob.getNotes());
    }
}
