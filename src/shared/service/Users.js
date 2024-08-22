import axios from "axios";

const url = `https://xbwpllxnhj.execute-api.us-east-1.amazonaws.com/Prod/`;

const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}getAll`);
        console.log('Usuarios obtenidos:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${url}get`, {
            params: {
                id_user: id
            }
        });
        console.log('Información del usuario:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

const registerUser = async (userData) => {
    try {
        const response = await axios.post('https://xbwpllxnhj.execute-api.us-east-1.amazonaws.com/Prod/insert_user', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Respuesta del servidor:', response);

        if (response.status === 200) {
            const { message } = response.data;
            console.log('Usuario registrado correctamente:', message);
        } else {
            throw new Error('Error al obtener la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error.response?.data?.message || error.message);
    }
};

const updateUserStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${url}updateStatus`, {
            id_user: id,
            status: status
        });
        
        console.log('Respuesta al actualizar el estado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
        throw error;
    }
};

const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${url}update_user`, userData);        
        console.log('Respuesta al actualizar el usuario:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};



export default {
    getAllUsers,
    getUserById,
    registerUser,
    updateUserStatus,
    updateUser
}