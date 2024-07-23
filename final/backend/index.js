// backend/server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;



app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://api.hubapi.com/your-endpoint`, {
            params: { q: query },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error is fetching data from HubSpot:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
