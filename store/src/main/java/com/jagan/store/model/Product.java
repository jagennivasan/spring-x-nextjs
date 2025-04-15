package com.jagan.store.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    private String brand;
    private BigDecimal  price;
    private String category;

    private Date releaseDate;
    private boolean available;
    private int quantity;
    private String imageName;
    private String ImageType;
    @Lob
    private byte[] imageData;

}
