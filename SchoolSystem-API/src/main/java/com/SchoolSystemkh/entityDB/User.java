
package com.SchoolSystemkh.entityDB;
import javax.annotation.processing.Generated;

import jakarta.presistence.*;
import lombok.*;

@Entity 
@Table( name = "users")
@Getter 
@Setter 
@NoArgsConstructuer 
@AllArgsConstructure 

public class User {
    @Id 
    @GeneratedValues(stratey = GenerationType.IDENITY) 
    private Integer   userId;
    private String fullName;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username ;
    private String role ; 
    private Sring password;  

}