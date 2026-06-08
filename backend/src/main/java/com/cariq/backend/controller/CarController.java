package com.cariq.backend.controller;

import com.cariq.backend.model.Car;
import com.cariq.backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/search")
    public List<Car> searchCars(@RequestParam String keyword) {
        return carService.searchCars(keyword);
    }

    @GetMapping("/price")
    public List<Car> getCarsByPrice(
            @RequestParam Double min,
            @RequestParam Double max) {
        return carService.getCarsByPriceRange(min, max);
    }

    @GetMapping("/fuel/{fuel}")
    public List<Car> getCarsByFuel(@PathVariable String fuel) {
        return carService.getCarsByFuel(fuel);
    }

    @GetMapping("/brand/{brand}")
    public List<Car> getCarsByBrand(@PathVariable String brand) {
        return carService.getCarsByBrand(brand);
    }

    @GetMapping("/transmission/{transmission}")
    public List<Car> getCarsByTransmission(@PathVariable String transmission) {
        return carService.getCarsByTransmission(transmission);
    }

    @GetMapping("/seats/{seats}")
    public List<Car> getCarsBySeats(@PathVariable Integer seats) {
        return carService.getCarsBySeats(seats);
    }

    @GetMapping("/new")
    public List<Car> getNewCars() {
        return carService.getAllCars().stream()
                .filter(c -> c.getOwner() != null &&
                        c.getOwner().equalsIgnoreCase("New") &&
                        c.getKmDriven() != null &&
                        c.getKmDriven() == 0)
                .collect(Collectors.toList());
    }

    @GetMapping("/recommend")
    public List<Car> getRecommended(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false, defaultValue = "0") Integer minSeats,
            @RequestParam(required = false, defaultValue = "false") Boolean firstOwner) {

        return carService.getAllCars().stream()
                .filter(c -> c.getSellingPrice() != null &&
                        c.getSellingPrice() >= minPrice &&
                        c.getSellingPrice() <= maxPrice)
                .filter(c -> fuel == null || fuel.isEmpty() ||
                        fuel.equalsIgnoreCase("No preference") ||
                        fuel.equalsIgnoreCase(c.getFuel()))
                .filter(c -> transmission == null || transmission.isEmpty() ||
                        transmission.equalsIgnoreCase("No preference") ||
                        transmission.equalsIgnoreCase(c.getTransmission()))
                .filter(c -> c.getSeats() == null || c.getSeats() >= minSeats)
                .filter(c -> !firstOwner ||
                        (c.getOwner() != null &&
                                c.getOwner().toLowerCase().contains("first")))
                .sorted((a, b) -> {
                    int scoreA = (a.getSellingPrice() != null ?
                            a.getSellingPrice().intValue() : 0)
                            + (a.getKmDriven() != null ? a.getKmDriven() * 2 : 0);
                    int scoreB = (b.getSellingPrice() != null ?
                            b.getSellingPrice().intValue() : 0)
                            + (b.getKmDriven() != null ? b.getKmDriven() * 2 : 0);
                    return scoreA - scoreB;
                })
                .limit(12)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<Car> getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable Long id) {
        return carService.deleteCar(id);
    }
}