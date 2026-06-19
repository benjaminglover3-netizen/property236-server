const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

const ICAL_URL = 'https://www.airbnb.com/calendar/ical/1014554898487766120.ics?t=1a27015c68ad43d6b58a78192843a405';

app.get('/ical', async (req, res) => {
  try {
    const response = await fetch(ICAL_URL);
    const text = await response.text();
    res.set('Content-Type', 'text/calendar');
    res.send(text);
  } catch (err) {
    res.status(500).send('Failed to fetch iCal');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
