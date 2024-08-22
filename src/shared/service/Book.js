import axios from "axios";

const url = `https://r6qt09mjyk.execute-api.us-east-1.amazonaws.com/Prod/`;
const url_Api_Google = 'https://www.googleapis.com/books/v1/volumes?q=subject:';

const createBook = async (bookData) => {
    try {
        const response = await axios.post(`${url}create_book`, bookData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el libro:', error);
        throw error;
    }
};


const getBookById = async (id) => {
    try {
        const response = await axios.get(`${url}getOne`, {
            params: { id_book: id }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el libro:', error);
        throw error;
    }
};

const getAllBooks = async () => {
    try {
        const response = await axios.get(`${url}getAll`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        throw error;
    }
};


const updateBookStatus = async (idBook, status) => {
    try {
        const response = await axios.patch(`${url}patch_status`, {
            id_book: idBook,
            status: status
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado del libro:', error);
        throw error;
    }
};


const updateBook = async (bookData) => {
    try {
        const response = await axios.put(`${url}update_book`, bookData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        throw error;
    }
};

//----------------------------------------------------------------

const formatBookData = (data) => {
    return data.items.map(item => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail
    }));
};

const getRomantic = async () => {
    try {
        const response = await axios.get(`${url_Api_Google}romance`);
        return formatBookData(response.data);
    } catch (error) {
        console.error('Error al obtener ApiRomance:', error);
        throw error;
    }
};

const getFiction = async () => {
    try {
        const response = await axios.get(`${url_Api_Google}fiction`);
        return formatBookData(response.data);
    } catch (error) {
        console.error('Error al obtener ApiFiction:', error);
        throw error;
    }
};

const getDrama = async () => {
    try {
        const response = await axios.get(`${url_Api_Google}drama`);
        return formatBookData(response.data);
    } catch (error) {
        console.error('Error al obtener ApiDrama:', error);
        throw error;
    }
};

const getFantasy = async () => {
    try {
        const response = await axios.get(`${url_Api_Google}fantasy`);
        return formatBookData(response.data);
    } catch (error) {
        console.error('Error al obtener ApiAction:', error);
        throw error;
    }
};

const getBooksByCategory = async (category) => {
    try {
        const response = await axios.get(`${url_Api_Google}${category}`);
        return formatBookData(response.data);
    } catch (error) {
        console.error(`Error al obtener libros de ${category}:`, error);
        throw error;
    }
};

const getBooksGoogle = async () => {
    try {
        const [romanticBooks, fictionBooks, dramaBooks, fantasyBooks] = await Promise.all([
            getBooksByCategory('romance'),
            getBooksByCategory('fiction'),
            getBooksByCategory('drama'),
            getBooksByCategory('fantasy')
        ]);
        return [...romanticBooks, ...fictionBooks, ...dramaBooks, ...fantasyBooks];
    } catch (error) {
        console.error('Error al obtener todos los libros:', error);
        throw error;
    }
};


export default {
    getAllBooks,
    getBookById,
    updateBookStatus,
    updateBook,
    createBook,
    getRomantic,
    getFiction,
    getDrama,
    getFantasy,
    getBooksByCategory,
    getBooksGoogle
}