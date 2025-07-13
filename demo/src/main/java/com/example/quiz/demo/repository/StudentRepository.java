package com.example.quiz.demo.repository;

import com.example.quiz.demo.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface StudentRepository extends JpaRepository<StudentEntity,Long> {

    Optional<StudentEntity> findByStudentIdAndStudentName(Long studentId, String studentName);

}
