import axios from "axios";

const url = `https://9iqsbtipt6.execute-api.us-east-1.amazonaws.com/Prod/`;

const getRoles = async () => {
    try {
        const response = await axios.get(`${url}getAll`);

        if (response.status === 200) {
            return response.data.data; 
        } else {
            throw new Error(response.data.error || 'Error al obtener los roles');
        }
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error;
    }
};

const createRole = async (roleData) => {
    try {
        const response = await axios.post(`${url}insert_rol`, roleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;  // Aquí está la respuesta exitosa
        } else {
            throw new Error(response.data.error || 'Error al crear el rol');
        }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        throw error;
    }
};

export default {
    getRoles,
    createRole
} 