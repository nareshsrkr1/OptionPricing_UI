import axios from 'axios';

const API_BASE_URL = 'http://workshop.eastus.cloudapp.azure.com:5000'; 

const flaskService = {

getThousandRecords: async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/read1krecords`);
 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
},

predictWithNN: async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    console.log("NN Response: ", typeof(response.data.option_value));
    return response.data.option_value;
  } catch (error) {
    console.error('Error Getting Call Price:', error);
    throw error;
  }
},

predictWithMonteCarlos: async (data: any) => {
    try {
      const responseMC = await axios.post(`${API_BASE_URL}/calcMC`, data);
      console.log("MC Response: ", responseMC);
      return responseMC.data['Monte Carlos Option value '];
    } catch (error) {
      console.error('Error Getting Call Price:', error);
      throw error;
    }
  },

predictMultipleRecordsCallPrice: async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/compareMC`, data);
      
      return response.data;
    } catch (error) {
      console.error('Error Getting Call Price:', error);
      throw error;
    }
  }

}

export default flaskService;