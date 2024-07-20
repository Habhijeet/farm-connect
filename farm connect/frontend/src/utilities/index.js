import axios from 'axios';
import { HOST } from '../constants';
import requirements from '../data/requirements.json';


axios.defaults.withCredentials = true;

export const loginUser = async (data) => {
    await axios.post(`${HOST}/api/auth/signin`, data);
}

export const getLoggedInUser = async () => {
    const response = await axios.get(`${HOST}/api/user`);
    return response.status < 400 && response.data && response.data.response;
}

export const logoutUser = async () => {
    const response = await axios.post(HOST + '/api/auth/signout');
    return response.status === 200;
}

export const registerUser = async (data) => {
    await axios.post(`${HOST}/api/auth/register`, data);
}

export const loadRequests = async (status, params) => {
    let url = HOST + '/api/app';

    if (status) {
        url += ('?status=' + status);
    }
    const response = await axios.get(url);
    return response.data && response.data.response;
}

export const createRequest = async (data) => {
    const response = await axios.post(HOST + '/api/app', data);
    return response.data.response;
}

export const updateRequestStatus = async (status, id) => {
    if (!status || !id) {
        throw new Error('Both status and id are required parameters.');
    }
    await axios.put(`${HOST}/api/app/${id}`, {status});
}

export const convertTime24to12 = (time) => {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}

export const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (String(modifier).toLowerCase().trim() === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getImageUrlFromRequirement = (requirement) => {
  let item = requirements.find(e => e.value === String(requirement).toLowerCase().split(' ').join(''));
  return item && item.image;
}