import axios from "axios";
const url = 'https://y3b8muy0l2.execute-api.us-east-1.amazonaws.com/Prod/'

const signUp = async (userDetails) => {
    try {
        const response = await axios.post(`${url}sign_up`, userDetails, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            const data = response.data;
            if (data.statusCode === 200) {
                return data;
            } else {
                throw new Error(data.message);
            }
        } else {
            throw new Error('Error al obtener la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${url}myProfile`, {
            params: { email: email },
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al obtener la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(`${url}login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            const data = response.data;
            console.log('Tokens:', data);
            localStorage.setItem('id_token', data.id_token);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('role', data.role);
            return data;
        } else {
            console.error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data?.error_message || error.message);
    }
};

const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${url}forgot_password`, { email }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { data } = response;
        if (response.status === 200 && data.message) {
            return data;
        } else {
            throw new Error(data.error_message || 'Error en la solicitud');
        }
    } catch (error) {
        console.error('Error al solicitar el restablecimiento de contraseña:', error.message || error);
        throw error;
    }
};


const confirmPassword = async (email, confirmationCode, newPassword) => {
    try {
        const response = await axios.post(`${url}confirm_password`, {
            email,
            confirmation_code: confirmationCode,
            new_password: newPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("Respuesta del servidor:", response);
        if (response.status === 200) {
            const data = response.data;
            if (data.message) {
                return data;
            } else {
                throw new Error('No se recibió un mensaje en la respuesta');
            }
        } else {
            throw new Error(`Error del servidor: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const changeTemporaryPassword = async (email, temporaryPassword, newPassword) => {
    try {
        const response = await axios.post(`${url}change_temporary`, {
            email,
            temporary_password: temporaryPassword,
            new_password: newPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta:', error.response.data);
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error; 
    }
};


export default {
    signUp,
    login,
    forgotPassword,
    confirmPassword,
    changeTemporaryPassword,
    getUserByEmail
}

