// 검토해보아야함
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001' // 기본 URL 설정
});

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await instance.post('/YOUR_REFRESH_ENDPOINT', { refreshToken });
            const newToken = res.data.accessToken;
            localStorage.setItem('accessToken', newToken);
            instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return instance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default instance;