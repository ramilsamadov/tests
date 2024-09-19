import axios from 'axios';

// const API_URL = 'https://your-api-url.com/api/customers'; // API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint
const CREATE_API_URL = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint

// Tüm müşterileri al
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Yeni müşteri oluştur
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(CREATE_API_URL, customerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Müşteri güncelle
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await axios.put(`${API_URL}/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    throw error;
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
