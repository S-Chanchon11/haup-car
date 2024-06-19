import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3456/cars';

const api = axios.create({
  baseURL: API_URL,
});

export const getAllCar = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async ({carId}) => {
  try {
    const response = await api.delete(`/${carId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCar = async (carInfo) => {
  try {
    const response = await api.post('/',carInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getACar = async (carId) => {
  try {
    const response = await api.get(`/${carId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateCar = async (carId,carInfo) => {
  try {
    const response = await api.post(`/${carId}`,carInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};
