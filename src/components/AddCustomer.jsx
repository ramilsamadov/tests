import React, { useState } from 'react';
import { createCustomer } from '../api';

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customerData);
      setSuccess('Müşteri başarıyla eklendi!');
      setCustomerData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (err) {
      setError('Müşteri eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="add-customer">
      <h2>Yeni Müşteri Ekle</h2>
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
        <button type="submit" className="btn btn-primary">Müşteri Ekle</button>
      </form>
    </div>
  );
};

export default AddCustomer;
