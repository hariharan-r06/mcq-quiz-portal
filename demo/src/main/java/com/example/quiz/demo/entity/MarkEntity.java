package com.example.quiz.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_mark")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MarkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private int studentMark;
}
