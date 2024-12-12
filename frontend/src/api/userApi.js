import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/users';

//（Create Account）
export const createUser = async (username, password) => {
    try {
        const response = await axios.post(API_BASE_URL, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response.data);
        throw error.response.data;
    }
};

//（Log In）
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response.data);
        throw error.response.data;
    }
};

//（Update User）
export const updateUser = async (id, username) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, { username});
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error.response.data);
        throw error.response.data;
    }
};

//（Delete User）
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response.data);
        throw error.response.data;
    }
};

//（Get All Users）
export const getUsers = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.response.data);
        throw error.response.data;
    }
};
