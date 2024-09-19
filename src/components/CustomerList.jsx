import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../api.js';  



const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (err) {
        setError('Error loading customers');
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);


  console.log("customers", customers);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
