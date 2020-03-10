import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const axiosApi = axios.create(
    {
        // baseURL: BASE_URL
    }
);

axiosApi.defaults.headers.post['Content-Type'] = 'application/json';
axiosApi.defaults.headers.get['Content-Type'] = 'application/json';

axiosApi.interceptors.request.use(request => {
    return request;
}, error => {
    return error;
});

axiosApi.interceptors.response.use(response => {
    return response;
}, error => {
    return error;
});

// -----------------------------------------------

export const getDataPromisse = async (url) => {
    return await axiosApi.get(url);
};

export const getData = async (url, set) => {
    await axiosApi.get(url, {})
        .then(response => {
            if (set) {
                const responseData = response.data;
                set(responseData);
            } else return response;
        })
        .catch(err => {
            console.log(err);
            if (set) {
                set([]);
            }
        });
};

export const postData = async (url, data, set) => {
    await axiosApi.post(url, data)
        .then(response => {
            if (set) {
                const responseData = response.data;
                set(responseData);
            }
        })
        .catch(err => {
            console.log(err);
            if (set) {
                set([]);
            }
        });
};

export const putData = async (url, id, data, set) => {
    await axiosApi.put(url, data)
        .then(response => {
            if (set) {
                const responseData = response.data;
                set(responseData);
            }
        })
        .catch(err => {
            console.log(err);
            if (set) {
                set([]);
            }
        });
};

export const deleteData = async (url, id) => {
    await axiosApi.delete(url+'/'+id)
        .then()
        .catch(err => {
            console.log(err);
        });
};
