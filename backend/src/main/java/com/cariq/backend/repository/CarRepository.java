package com.cariq.backend.repository;

import com.cariq.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByFuel(String fuel);
    List<Car> findByBrand(String brand);
    List<Car> findByTransmission(String transmission);
    List<Car> findBySeats(Integer seats);

    @Query("SELECT c FROM Car c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Car> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT c FROM Car c WHERE c.sellingPrice BETWEEN :min AND :max")
    List<Car> findByPriceRange(
            @Param("min") Double min,
            @Param("max") Double max
    );
}