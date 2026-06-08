package com.cariq.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private Integer year;
    private Double sellingPrice;
    private Integer kmDriven;
    private String fuel;
    private String sellerType;
    private String transmission;
    private String owner;
    private String mileage;
    private String engine;
    private String maxPower;
    private Integer seats;
}