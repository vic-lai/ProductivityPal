package com.pp.productivity_pal.leetcode_data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Problem {
    @Id
    @SequenceGenerator(
        name="problem_sequence",
        sequenceName= "problem_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "problem_sequence"
    )
    private long l_id;
    private String difficulty;
    private String name;
    private String notes;
    private String type;
    private String status;
    private String link;

    public Problem() {
    }

    public Problem(String difficulty, String name, String notes, String type, String status, String link) {
        this.difficulty = difficulty;
        this.name = name;
        this.notes = notes;
        this.type = type;
        this.status = status;
        this.link = link;
    }

    public Problem(long l_id, String difficulty, String name, String notes, String type, String status, String link) {
        this.l_id = l_id;
        this.difficulty = difficulty;
        this.name = name;
        this.notes = notes;
        this.type = type;
        this.status = status;
        this.link = link;
    }


    public long getL_id() {
        return l_id;
    }
    public void setL_id(long l_id) {
        this.l_id = l_id;
    }
    public String getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getLink() {
        return link;
    }
    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "Problem [l_id=" + l_id + ", difficulty=" + difficulty + ", name=" + name + ", notes=" + notes
                + ", type=" + type + ", status=" + status + ", link=" + link + "]";
    }

    
}
