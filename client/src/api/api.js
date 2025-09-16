import axios from 'axios';
import { API_BASE_URL } from './api.url';

const API_GMAIL = async (urlObject, payload = {}, type = '') => {
  const config = {
    method: urlObject.method,
    url: `${API_BASE_URL}/${urlObject.endpoint}${type ? `/${type}` : ''}`,
    data: payload,
  };
  return await axios(config);
};

export default API_GMAIL;
