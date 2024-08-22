import axios from "axios";

const url = ''

const postRecommendation = async (idBook, idUser, recommendationText) => {
    try {
        const response = await axios.post(url, {
            id_book: idBook,
            id_user: idUser,
            recommendation_text: recommendationText
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Recomendación creada correctamente:', response.data);
    } catch (error) {
        console.error('Error al crear la recomendación:', error.response ? error.response.data : error.message);
    }
};

const getRecommendations = async () => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Recomendaciones obtenidas correctamente:', response.data);
    } catch (error) {
        console.error('Error al obtener las recomendaciones:', error.response ? error.response.data : error.message);
    }
};

const getIdRecommendation = async (idRecommendation) => {
    try {
        const response = await axios.get(url, {
            params: { id_recommendation: idRecommendation },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Recomendación obtenida correctamente:', response.data);
    } catch (error) {
        console.error('Error al obtener la recomendación:', error.response ? error.response.data : error.message);
    }
};

const updateRecommendation = async (idRecommendation, idBook, idUser, recommendationText) => {
    try {
        const response = await axios.put(url, {
            id_recommendation: idRecommendation,
            id_book: idBook,
            id_user: idUser,
            recommendation_text: recommendationText
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Recomendación actualizada correctamente:', response.data);
    } catch (error) {
        console.error('Error al actualizar la recomendación:', error.response ? error.response.data : error.message);
    }
};



export default {
    postRecommendation,
    getRecommendations,
    getIdRecommendation,
    updateRecommendation
}