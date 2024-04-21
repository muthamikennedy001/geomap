import React, { useState } from "react";
import axios from "axios"; // Import axios

function ProductCard({ recommendation, farmerIdNo }) {
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const getImageSrc = (recommendation) => {
    switch (recommendation) {
      case "Urea":
        return "/fertilizerimages/urea.jpg";
      case "10-26-26":
        return "/fertilizerimages/10-26-26.webp";
      case "DAP":
        return "/fertilizerimages/dap.jpg";
      case "14-35-14":
        return "/fertilizerimages/14-35-14.jpg";
      case "17-17-17":
        return "/fertilizerimages/17-17-17.jpeg";
      case "20-20-20":
        return "/fertilizerimages/20-20-20.webp";
      case "20-20":
        return "/fertilizerimages/20-20.jpg";
      default:
        return "/fertilizerimages/default.jpg"; // Default image if recommendation not found
    }
  };
  let imageSrc = getImageSrc(recommendation);
  let price = quantity * 3500;
  let bagSize = "50Kg";

  const addToCart = async () => {
    const orderData = {
      farmerIdNo: farmerIdNo,
      fertilizerName: recommendation,
      quantity: quantity,
      price: price,
      orderStatus: "Pending",
    };

    try {
      const response = await axios.post(
        "http://localhost:2000/api/orders",
        orderData
      );

      // Check if the POST request was successful
      if (response.status === 201) {
        console.log(response.data);

        // Set success status to true
        setIsSuccess(true);

        // Hide the product card
        setIsVisible(false);

        // Refresh the page after 2 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);

        console.log("Order created:");

        // Optionally, you can handle success here
      } else {
        // Handle other status codes (if necessary)
      }
    } catch (error) {
      console.error("Error creating order:", error.response.data.error);
      // Optionally, you can handle errors here
    }
  };

  return (
    <>
      {isVisible && (
        <div className="flex justify-center  bg-gray-200">
          <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="peer absolute top-0 right-0 h-full w-full object-cover"
                src={imageSrc}
                alt="product image"
              />
              {/* Add hover image transition */}
              <img
                className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                src={imageSrc}
                alt="product image"
              />
              <svg
                className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                />
              </svg>
              {/* Add discount label if available */}
              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {recommendation}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    {price}
                  </span>
                  {/* Display discount price if available */}

                  <span className="text-sm text-slate-900  ml-4">
                    for {quantity} - {bagSize} bag
                  </span>
                </p>
              </div>
              {/* Input field for quantity */}
              <div className="flex items-center justify-between">
                <label htmlFor="quantity" className="mr-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
              </div>
              {/* Add to cart button */}
              <button
                onClick={() => addToCart(quantity)}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-green-100 px-4 py-3 leading-normal text-green-700 rounded-lg shadow-md">
            <p className="font-bold">Product added to cart successfully!</p>
            <p>Your order has been placed.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
