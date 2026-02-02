import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const bookingData = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 200,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-01',
    checkout: '2024-01-05'
  },
};

const updatedBookingData = {
  firstname: 'Jane',
  lastname: 'Smith',
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: '2024-02-01',
    checkout: '2024-02-07'
  },
};

let bookingId;
let authToken;

test.describe('CRUD for booking @api', () => {
  
  test('POST', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: bookingData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });


    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    
    expect(responseBody).toHaveProperty('bookingid');
    bookingId = responseBody.bookingid;
    
    expect(responseBody.booking).toMatchObject(bookingData);
    
    console.log(`Создано бронирование с ID: ${bookingId}`);
  });

   test('GET', async ({ request }) => {
    expect(bookingId).toBeDefined();
    
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    
    expect(responseBody).toMatchObject(bookingData);
  });

  test('Токен', async ({ request }) => {
    const authData = {
      username: 'admin',
      password: 'password123'
    };
    
    const response = await request.post(`${BASE_URL}/auth`, {
      data: authData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    
    authToken = responseBody.token;
    console.log(`Получен токен: ${authToken.substring(0, 20)}...`);
  });


  test('PUT', async ({ request }) => {
    expect(bookingId).toBeDefined();
    expect(authToken).toBeDefined();
    
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      data: updatedBookingData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${authToken}`
      }
    });

    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    
    expect(responseBody).toMatchObject(updatedBookingData);
  });

  test('DELETE', async ({ request }) => {
    expect(bookingId).toBeDefined();
    expect(authToken).toBeDefined();
    
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${authToken}`
      }
    });

    expect(response.status()).toBe(201);
    
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    expect(getResponse.status()).toBe(404);
  });
});