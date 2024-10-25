package com.pp.productivity_pal.leetcode_data;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProblemTest {

    private Problem problem;

    @BeforeEach
    void setUp() {
        problem = new Problem();
    }

    @Test
    void testDefaultConstructor() {
        assertNull(problem.getDifficulty());
        assertNull(problem.getName());
        assertNull(problem.getNotes());
        assertNull(problem.getType());
        assertNull(problem.getStatus());
        assertNull(problem.getLink());
        assertEquals(0, problem.getid());
    }

    @Test
    void testParameterizedConstructor() {
        Problem paramProblem = new Problem("Medium", "Two Sum", "Use hashmap for O(n)", "Algorithm", "Solved", "https://leetcode.com/problems/two-sum");
        
        assertEquals("Medium", paramProblem.getDifficulty());
        assertEquals("Two Sum", paramProblem.getName());
        assertEquals("Use hashmap for O(n)", paramProblem.getNotes());
        assertEquals("Algorithm", paramProblem.getType());
        assertEquals("Solved", paramProblem.getStatus());
        assertEquals("https://leetcode.com/problems/two-sum", paramProblem.getLink());
    }

    @Test
    void testSetterAndGetter() {
        problem.setid(1);
        problem.setDifficulty("Easy");
        problem.setName("Reverse String");
        problem.setNotes("In-place two-pointer technique");
        problem.setType("String");
        problem.setStatus("Attempted");
        problem.setLink("https://leetcode.com/problems/reverse-string");

        assertEquals(1, problem.getid());
        assertEquals("Easy", problem.getDifficulty());
        assertEquals("Reverse String", problem.getName());
        assertEquals("In-place two-pointer technique", problem.getNotes());
        assertEquals("String", problem.getType());
        assertEquals("Attempted", problem.getStatus());
        assertEquals("https://leetcode.com/problems/reverse-string", problem.getLink());
    }

    @Test
    void testToString() {
        problem.setid(1);
        problem.setDifficulty("Hard");
        problem.setName("Median of Two Sorted Arrays");
        problem.setNotes("Binary search solution");
        problem.setType("Algorithm");
        problem.setStatus("Unsolved");
        problem.setLink("https://leetcode.com/problems/median-of-two-sorted-arrays");

        String expected = "Problem [id=1, difficulty=Hard, name=Median of Two Sorted Arrays, notes=Binary search solution, type=Algorithm, status=Unsolved, link=https://leetcode.com/problems/median-of-two-sorted-arrays]";
        assertEquals(expected, problem.toString());
    }
}
