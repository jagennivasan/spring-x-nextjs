"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/lib/validationSchema";

export default function AddProduct() {
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    available: false,
    quantity: "",
  });

  const [imageFile, setImageFile] = useState<File | String | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handelFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    const formData = new FormData();
    if (imageFile && imageFile instanceof File) {
      formData.append("imageFile", imageFile);
    }
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
  
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        router.push("/dashboard");
      } else {
        setError("Failed to submit product.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };
  

  return (
    <form className="flex justify-center items-center flex-col w-full space-y-3">
      <div className="flex flex-col">
        <label>Product Name</label>
        <input
          type="text"
          value={product.name}
          placeholder="Enter Product Name"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          name="name"
          onChange={handelFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Product Brand</label>
        <input
          type="text"
          placeholder="Enter Product Brand"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          name="brand"
          value={product.brand}
          onChange={handelFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Product Description</label>
        <input
          type="text"
          placeholder="Enter Product Description"
          value={product.description}
          name="description"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          onChange={handelFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Product Price</label>
        <input
          type="text"
          placeholder="Enter Product Price"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          onChange={handelFormChange}
          value={product.price}
          name="price"
        />
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          placeholder="Enter Product Category"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          onChange={handelFormChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Product Quantity</label>
        <input
          type="text"
          placeholder="Enter Product Quantity"
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          onChange={handelFormChange}
          value={product.quantity}
          name="quantity"
        />
      </div>
      <div className="flex flex-col">
        <label>Release Date</label>
        <input
          type="date"
          name="releaseDate"
          value={product.releaseDate}
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          onChange={handelFormChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          className="px-2 py-2 rounded-xl border-blue-600 border-2"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex space-x-5 items-center">
        <label>Available:</label>
        <input
          type="checkbox"
          name="available"
          checked={product.available}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              available: e.target.checked,
            }))
          }
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={handelSubmit}
        className="bg-blue-700 px-3 py-2 text-white rounded-2xl"
      >
        Submit
      </button>
    </form>
  );
}
