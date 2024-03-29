import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function FertilizerForm({ farmParcelId, farmerIdNo }) {
  const [recommendation, setRecommendation] = useState("");
  const [cart, setCart] = useState([]);
  const apiUrl = "http://127.0.0.1:2000/api/";
  const [formData, setFormData] = useState({
    Temperature: "",
    Humidity: "",
    Moisture: "",
    pH: "",
    NitrogenLevel: "",
    PotassiumLevel: "",
    PhosphorusLevel: "",
    Soil_Num: "", // Change to numerical representation
    Crop_Num: "", // Add Crop_Num field
  });

  useEffect(() => {
    // Fetch data and update form fields
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const soilDataResponse = await axios.get(
        `${apiUrl}/soildata/${farmParcelId}`
      );
      const filteredData = Object.entries(soilDataResponse.data)
        .filter(
          ([key]) =>
            !["createdAt", "updatedAt", "soilDataId", "farmParcelId"].includes(
              key
            )
        )
        .reduce((obj, [key, value]) => {
          // Convert soil type to numerical representation
          if (key === "SoilType") {
            obj["Soil_Num"] = mapSoilTypeToNumber(value);
          } else {
            obj[key] = value;
          }
          return obj;
        }, {});
      console.log("filtered", filteredData);
      // Update form data state with fetched data
      setFormData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  // Function to map soil type to numerical representation
  const mapSoilTypeToNumber = (soilType) => {
    // Define your mapping here
    const soilTypeMapping = {
      loam: 1,
      sandy: 2,
      clay: 3,
      black: 4,
      red: 5,
      // Add more soil types as needed
    };
    return soilTypeMapping[soilType.toLowerCase()] || 0; // Default to 0 if soil type not found
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/fertilizer/",
        formData
      );
      setRecommendation(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCart = (quantity) => {
    const newItem = { recommendation, quantity };
    setCart([...cart, newItem]);
    setRecommendation(""); // Clear recommendation after adding to cart
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("formdata", formData);

  return (
    <div className="flex flex-col mt-8">
      <div className="overflow-x-auto rounded-lg ">
        <div className="align-middle inline-block min-w-full  ">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="flex w-full justify-center py-10 items-center bg-white">
              <form className="bg-white" onSubmit={handleSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Get Fertilizer Recommendation
                </h1>
                <p className="mb-7"></p>
                <div className="flex flex-wrap">
                  {/* Form fields */}

                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {key}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>
                  ))}
                  {/* Hardcoded crop dropdown */}
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Select Crop:
                    </label>
                    <select
                      name="Crop_Num"
                      value={formData.Crop_Num}
                      onChange={handleInputChange}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Select Crop</option>
                      {/* Hardcoded crop options */}
                      <option value="1">Sugarcane</option>
                      <option value="2">Cotton</option>
                      <option value="3">Millets</option>
                      <option value="4">Paddy</option>
                      <option value="5">Pulses</option>
                      <option value="6">Wheat</option>
                      <option value="7">Tobacco</option>
                      <option value="8">Barley</option>
                      <option value="9">Oil Seeds</option>
                      <option value="10">Ground Nuts</option>
                      <option value="11">Maize</option>
                      <option value="12">Potatoes</option>
                      <option value="13">Tomatoes</option>
                      <option value="14">Beans</option>
                      <option value="15">Cassava</option>
                      <option value="16">Bananas</option>

                      {/* Add more crop options as needed */}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
                >
                  Get Recommendation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Recommendation display */}
      {/* {recommendation && (
        <div className="mt-4">
          <p>Recommended Fertilizer: {recommendation}</p>
          <div className="flex items-center mt-2">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
              id="quantityInput"
            />
          </div>
          <button
            onClick={() =>
              addToCart(document.getElementById("quantityInput").value)
            }
            className="bg-green-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      )} */}
      {recommendation && (
        <ProductCard recommendation={recommendation} farmerIdNo={farmerIdNo} />
      )}
      {/* Cart */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Order Fertilizer</h2>
        <div>
          <h3 className="text-lg font-semibold">Cart</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.recommendation} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FertilizerForm;
