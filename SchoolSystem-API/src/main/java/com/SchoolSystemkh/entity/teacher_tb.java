package com.SchoolSystemkh.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admin_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    private String name;
    private String email;
    private String username;
    private String password;
}