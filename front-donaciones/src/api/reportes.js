import axios from 'axios';
import { ALL_REPORTS } from '../utils/reportConfig';

const API_URL = 'http://localhost:3000/api';

export const fetchReportData = async (endpoint, params) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching report ${endpoint}:`, error);
    throw error;
  }
};

const reportApis = {};
Object.keys(ALL_REPORTS).forEach(reportKey => {
  reportApis[`fetch${reportKey}`] = (params) => 
    fetchReportData(ALL_REPORTS[reportKey].endpoint, params);
});

export default reportApis;
