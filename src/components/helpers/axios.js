import axios from 'axios'
import CryptoJS from "crypto-js";
import { baseUrl } from '../../config/API';

const axiosInstance = {
    getToken: () => {
        const encryptedTokenField = sessionStorage.key(0)
        let bytes = null
        let decryptedTokenField = null
        if (encryptedTokenField != null) {
            bytes = CryptoJS.AES.decrypt(encryptedTokenField, 'kshrd');
            decryptedTokenField = bytes.toString(CryptoJS.enc.Utf8);
        }

        let token = null

        if (decryptedTokenField === 'token') {
            let encryptedToken = sessionStorage.getItem(encryptedTokenField)
            let bytes = CryptoJS.AES.decrypt(encryptedToken, 'kshrd');
            token = bytes.toString(CryptoJS.enc.Utf8);
        }


        const axiosInstance = axios.create({
            baseURL: baseUrl,
        })

        axiosInstance.defaults.headers.common['Authorization'] = token;

        return axiosInstance
    }
}



export default axiosInstance;
