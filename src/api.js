import axios from "axios";

// const API_URL = 'https://your-api-url.com/api/customers'; // API endpoint
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // API endpoint
const CREATE_API_URL = "https://jsonplaceholder.typicode.com/posts"; // API endpoint

// Tüm müşterileri al
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Customize the error message if Axios request fails
      throw new Error("Error fetching customers");
    }
    throw error; // Re-throw for any other unknown errors
  }
};

// Yeni müşteri oluştur
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(CREATE_API_URL, customerData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Customize the error message if Axios request fails
      throw new Error("Error creating customer");
    }
    throw error; // Re-throw for any other unknown errors
  }
};

// Müşteri güncelle
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating customer"); // Custom error message
  }
};

// Müşteri sil
export const deleteCustomer = async (customerId) => {
  try {
    await axios.delete(`${API_URL}/${customerId}`);
  } catch (error) {
    throw error;
  }
};
