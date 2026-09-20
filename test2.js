const axios = require('axios');
const token = 'MOCK_TOKEN'; // We'll bypass auth manually or test if it 404s
axios.get('http://localhost:5001/api/laser-changeover/reports').then(res => console.log('RES KEYS:', Object.keys(res), 'DATA:', res.data)).catch(err => console.log('ERR:', err.message, err.response?.status));
