package com.example.quiz.demo.Controller;

import com.example.quiz.demo.entity.MarkEntity;
import com.example.quiz.demo.entity.StudentEntity;
import com.example.quiz.demo.repository.MarkRepository;
import com.example.quiz.demo.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174"
})
@RequestMapping("/api/student")
public class StudentController {

    private final StudentRepository studentRepository;
    private final MarkRepository markRepository;

    public StudentController(StudentRepository studentRepository, MarkRepository markRepository) {
        this.studentRepository = studentRepository;
        this.markRepository = markRepository;
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody StudentEntity student) {
        Optional<StudentEntity> existing = studentRepository.findByStudentIdAndStudentName(
                student.getStudentId(), student.getStudentName());

        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Student already exists.");
        }

        Optional<MarkEntity> existingMark = markRepository.findByStudentId(student.getStudentId());
        if (existingMark.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Student has already taken the quiz.");
        }

        studentRepository.save(student);
        return ResponseEntity.ok("Student registered successfully.");
    }


    @PostMapping("/mark")
    public ResponseEntity<String> addMark(@RequestBody MarkEntity mark) {
        Optional<MarkEntity> existingMark = markRepository.findByStudentId(mark.getStudentId());

        if (existingMark.isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Mark already submitted for studentId: " + mark.getStudentId());
        }

        markRepository.save(mark);
        return ResponseEntity.ok("Mark saved successfully");
    }

    @GetMapping("/mark/{studentId}")
    public ResponseEntity<MarkEntity> getMarkByStudentId(@PathVariable Long studentId) {
        Optional<MarkEntity> mark = markRepository.findByStudentId(studentId);
        return mark.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
