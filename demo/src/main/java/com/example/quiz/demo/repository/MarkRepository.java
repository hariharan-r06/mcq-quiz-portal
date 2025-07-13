package com.example.quiz.demo.repository;

import com.example.quiz.demo.entity.MarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarkRepository extends JpaRepository<MarkEntity, Long> {
     Optional<MarkEntity> findByStudentId(Long studentId);
}
