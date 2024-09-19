import React, { useState, useEffect } from 'react';
import { updateCustomer, getAllCustomers } from '../api';

const UpdateCustomer = ({ customerId }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getAllCustomers(customerId);
        setCustomerData(data);
      } catch (err) {
        setError('Müşteri bilgilerini alırken bir hata oluştu.');
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(customerId, customerData);
      setSuccess('Müşteri başarıyla güncellendi!');
    } catch (err) {
      setError('Müşteri güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="update-customer">
      <h2>Müşteri Güncelle</h2>
      {error && <div className="error-alert">{error}</div>}
      {success && <div className="success-alert">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Ad"
          value={customerData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Soyad"
          value={customerData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={customerData.phone}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Müşteri Güncelle</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
