const axios = require('axios');
axios.get('http://localhost:5001/api/laser-changeover/reports').then(res => console.log('DATA:', res.data)).catch(err => console.error('ERROR:', err.message));
