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
@Order(2)
public class NewCarDataLoader implements CommandLineRunner {

    @Autowired
    private CarRepository carRepository;

    @Override
    public void run(String... args) throws Exception {
        InputStream is = getClass().getResourceAsStream("/All_cars_dataset.csv");
        if (is == null) {
            System.out.println("All_cars_dataset.csv not found!");
            return;
        }

        CSVReader reader = new CSVReader(new InputStreamReader(is));
        String[] line;
        boolean firstLine = true;
        int count = 0;

        System.out.println("Loading new showroom cars...");

        while ((line = reader.readNext()) != null) {
            if (firstLine) { firstLine = false; continue; }
            try {
                if (line.length < 7) continue;

                Car car = new Car();

                String fullName = getSafe(line, 0);
                String[] nameParts = fullName.trim().split(" ");
                car.setBrand(nameParts[0]);
                car.setName(fullName);

                String priceRaw = getSafe(line, 2)
                        .replaceAll("[^0-9.]", "").trim();
                double priceInLakh = priceRaw.isEmpty() ? 0 :
                        Double.parseDouble(priceRaw);
                car.setSellingPrice(priceInLakh * 100000);

                car.setMileage(getSafe(line, 3));
                car.setEngine(getSafe(line, 4));

                String trans = getSafe(line, 5).trim();
                if (trans.contains(",")) trans = "Automatic";
                car.setTransmission(trans);

                car.setFuel(getSafe(line, 6).trim());

                String seatsRaw = getSafe(line, 17).trim();
                int seats = 5;
                try {
                    seats = (int) Double.parseDouble(seatsRaw);
                } catch (Exception ignored) {}
                car.setSeats(seats);

                car.setMaxPower(getSafe(line, 19));
                car.setOwner("New");
                car.setSellerType("Showroom");
                car.setKmDriven(0);
                car.setYear(2024);

                if (car.getSellingPrice() > 0) {
                    carRepository.save(car);
                    count++;
                }

            } catch (Exception e) {
                System.out.println("Skip: " + e.getMessage());
            }
        }
        reader.close();
        System.out.println("=================================");
        System.out.println("✅ New showroom cars loaded: " + count);
        System.out.println("=================================");
    }

    private String getSafe(String[] line, int index) {
        if (index >= line.length || line[index] == null) return "";
        return line[index].trim();
    }
}