package com.cariq.backend.loader;

import com.cariq.backend.model.Car;
import com.cariq.backend.repository.CarRepository;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;

@Component
@Order(1)
public class CarDataLoader implements CommandLineRunner {

    @Autowired
    private CarRepository carRepository;

    @Override
    public void run(String... args) throws Exception {

        if (carRepository.count() > 0) {
            System.out.println("Database already has data — skipping import.");
            return;
        }

        System.out.println("Loading used car dataset...");

        InputStream is = getClass().getResourceAsStream("/final_cars.csv");

        if (is == null) {
            System.out.println("final_cars.csv not found!");
            return;
        }

        CSVReader reader = new CSVReader(new InputStreamReader(is));

        String[] line;
        boolean firstLine = true;
        int count = 0;
        int skipped = 0;

        while ((line = reader.readNext()) != null) {

            if (firstLine) {
                firstLine = false;
                continue;
            }

            try {
                if (line.length < 10) {
                    skipped++;
                    continue;
                }

                Car car = new Car();

                // Column 0 → Brand
                car.setBrand(getSafe(line, 0));

                // Column 1 → Name
                car.setName(getSafe(line, 1));

                // Column 2 → Selling Price
                car.setSellingPrice(parseDouble(getSafe(line, 2)));

                // Column 3 → Year
                car.setYear(parseInt(getSafe(line, 3)));

                // Column 4 → KM Driven
                car.setKmDriven(parseInt(getSafe(line, 4)));

                // Column 5 → Fuel
                car.setFuel(getSafe(line, 5));

                // Column 6 → Transmission
                car.setTransmission(getSafe(line, 6));

                // Column 7 → Owner
                car.setOwner(getSafe(line, 7));

                // Column 8 → Seller Type
                car.setSellerType(getSafe(line, 8));

                // Column 9 → Engine
                car.setEngine(getSafe(line, 9));

                // Column 10 → Max Power
                car.setMaxPower(getSafe(line, 10));

                // Column 11 → Seats
                String seatsRaw = getSafe(line, 11).trim();
                int seats = 5;
                if (!seatsRaw.isEmpty()) {
                    try {
                        seats = (int) Double.parseDouble(seatsRaw);
                    } catch (Exception e) {
                        seats = 5;
                    }
                }
                car.setSeats(seats);

                // Column 12 → Mileage
                car.setMileage(getSafe(line, 12));

                if (car.getSellingPrice() > 0 &&
                        car.getName() != null &&
                        !car.getName().isEmpty()) {
                    carRepository.save(car);
                    count++;
                } else {
                    skipped++;
                }

            } catch (Exception e) {
                skipped++;
            }
        }

        reader.close();

        System.out.println("=================================");
        System.out.println("✅ Used cars loaded: " + count);
        System.out.println("❌ Skipped rows: " + skipped);
        System.out.println("=================================");
    }

    private String getSafe(String[] line, int index) {
        if (index >= line.length) return "";
        if (line[index] == null) return "";
        return line[index].trim();
    }

    private int parseInt(String value) {
        try {
            if (value == null || value.isEmpty()
                    || value.equalsIgnoreCase("null")) return 0;
            value = value.replaceAll("[^0-9]", "");
            if (value.isEmpty()) return 0;
            return Integer.parseInt(value);
        } catch (Exception e) {
            return 0;
        }
    }

    private double parseDouble(String value) {
        try {
            if (value == null || value.isEmpty()
                    || value.equalsIgnoreCase("null")) return 0.0;
            value = value.replaceAll("[^0-9.]", "");
            if (value.isEmpty()) return 0.0;
            return Double.parseDouble(value);
        } catch (Exception e) {
            return 0.0;
        }
    }
}