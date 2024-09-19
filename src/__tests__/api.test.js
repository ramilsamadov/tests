import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api';

const mock = new MockAdapter(axios);
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const CREATE_API_URL = 'https://jsonplaceholder.typicode.com/posts';

describe('API functions', () => {
  
  // getAllCustomers testi
  test('fetches customers successfully from API', async () => {
    const mockData = [
      { id: 1, title: 'John Doe' },
      { id: 2, title: 'Jane Doe' },
    ];
    
    mock.onGet(API_URL).reply(200, mockData); // Mock API yanıtı
    
    const customers = await getAllCustomers();
    
    expect(customers).toEqual(mockData); // Yanıtın doğru olup olmadığını kontrol et
  });
  
  // createCustomer testi
  test('creates a new customer successfully', async () => {
    const newCustomer = { id: 3, name: 'New Customer' };
    
    mock.onPost(API_URL).reply(201, newCustomer); // Mock POST yanıtı
    
    const createdCustomer = await createCustomer(newCustomer);
    
    expect(createdCustomer).toEqual(newCustomer); // Yeni müşterinin eklendiğini doğrula
  });
  
  // updateCustomer testi
  test('updates a customer successfully', async () => {
    const updatedCustomer = { id: 1, name: 'Updated Customer' };
    
    mock.onPut(`${API_URL}/1`).reply(200, updatedCustomer); // Mock PUT yanıtı
    
    const result = await updateCustomer(1, updatedCustomer);
    
    expect(result).toEqual(updatedCustomer); // Güncellenen verilerin doğru olup olmadığını kontrol et
  });
  
  // deleteCustomer testi
  test('deletes a customer successfully', async () => {
    mock.onDelete(`${API_URL}/1`).reply(200); // Mock DELETE yanıtı
    
    await expect(deleteCustomer(1)).resolves.not.toThrow(); // Silme işleminin hata fırlatmadığını kontrol et
  });
  
  // Hata durumlarını test et
  test('handles error when fetching customers', async () => {
    mock.onGet(API_URL).reply(500); // Mock hata yanıtı
    
    await expect(getAllCustomers()).rejects.toThrow('Error fetching customers');
  });
  
  test('handles error when creating a customer', async () => {
    mock.onPost(CREATE_API_URL).reply(500); // Mock hata yanıtı
    
    await expect(createCustomer({ id: 10012, title: 'Jane Doe' })).rejects.toThrow('Error creating customer');
  });
});
