import axios from 'axios';

const BASE_URL = 'http://192.168.100.110:8088/api';

const path = {
    createGuest: () => `/ticket`,
    userConfirmInvitation: (id) => `/ticket/${id}`,
    guestConfirmInvitation: (id) => `/ticket/${id}/guest`,
    getData: () => `/ticket/data`,
    linkInvite: (id) => `/ticket/${id}`,

};

const api = axios.create({
    baseURL: BASE_URL,
});

const ApiService = () => {
    // Méthode générique pour les appels HTTP


    return {

        createGuest: async (fullName) => {
            try {
                const response = await api.post(path.createGuest(), { fullName }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;

            } catch (error) {
                console.error('Erreur:', error.response?.data?.message || error.message);
                throw error.response?.data || error;
            }
        },


        getData: async () => {
            try {
                const response = await api.get(path.getData(), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;

            } catch (error) {
                console.error('Erreur:', error.response?.data?.message || error.message);
                throw error.response?.data || error;
            }
        },


        getUser: async (id) => {
            try {
                const response = await api.get(path.linkInvite(id), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;

            } catch (error) {
                console.error('Erreur:', error.response?.data?.message || error.message);
                throw error.response?.data || error;
            }
        },

        guestConfirm: async (id, name) => {
            try {
                const response = await api.put(path.guestConfirmInvitation(id), { name }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;

            } catch (error) {
                console.error('Erreur:', error.response?.data?.message || error.message);
                throw error.response?.data || error;
            }
        },

        userConfirm: async (id) => {
            try {
                const response = await api.put(path.userConfirmInvitation(id), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;

            } catch (error) {
                console.error('Erreur:', error.response?.data?.message || error.message);
                throw error.response?.data || error;
            }
        },

    }
};




const apiService = ApiService();

export default apiService;