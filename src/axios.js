import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://bff.oi-test.local',
  validateStatus: status => status >= 200 && status < 500,
});

export default instance;
