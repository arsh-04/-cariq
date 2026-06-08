package com.cariq.backend.service;

import com.cariq.backend.model.Car;
import com.cariq.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public List<Car> getCarsByFuel(String fuel) {
        return carRepository.findByFuel(fuel);
    }

    public List<Car> getCarsByBrand(String brand) {
        return carRepository.findByBrand(brand);
    }

    public List<Car> getCarsByTransmission(String transmission) {
        return carRepository.findByTransmission(transmission);
    }

    public List<Car> getCarsBySeats(Integer seats) {
        return carRepository.findBySeats(seats);
    }

    public List<Car> searchCars(String keyword) {
        return carRepository.searchByKeyword(keyword);
    }

    public List<Car> getCarsByPriceRange(Double min, Double max) {
        return carRepository.findByPriceRange(min, max);
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public String deleteCar(Long id) {
        carRepository.deleteById(id);
        return "Car deleted successfully";
    }
}