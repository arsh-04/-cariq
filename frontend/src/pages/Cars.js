import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://cariq-av3o.onrender.com/api/cars";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);

    try {
      const res = await axios.get(API);

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.content)
        ? res.data.content
        : [];

      setAllCars(data);
      setCars(data);

    } catch (e) {
      console.error("Fetch all cars error:", e);
      setAllCars([]);
      setCars([]);
    }

    setLoading(false);
  };

  const fetchSearch = async (keyword) => {
    if (!keyword.trim()) {
      setCars(allCars);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/search?keyword=${keyword}`
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.content)
        ? res.data.content
        : [];

      setCars(data);

    } catch (e) {
      console.error("Search cars error:", e);
      setCars([]);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSearch(value);
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>CarIQ Cars</h1>

      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "none",
        }}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {Array.isArray(cars) &&
            cars.map((car, index) => (
              <div
                key={index}
                style={{
                  background: "#1e1e1e",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #333",
                }}
              >
                <h2>{car.name}</h2>

                <p>
                  <strong>Brand:</strong> {car.brand}
                </p>

                <p>
                  <strong>Year:</strong> {car.year}
                </p>

                <p>
                  <strong>Price:</strong> ₹{car.sellingPrice}
                </p>

                <p>
                  <strong>Fuel:</strong> {car.fuel}
                </p>

                <p>
                  <strong>Transmission:</strong> {car.transmission}
                </p>

                <p>
                  <strong>Owner:</strong> {car.owner}
                </p>

                <p>
                  <strong>KMs Driven:</strong> {car.kmDriven}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Cars;