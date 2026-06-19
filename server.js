const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

app.use(cors());

const ICAL_URL = 'https://www.airbnb.com/calendar/ical/1014554898487766120.ics?t=1a27015c68ad43d6b58a78192843a405';

app.get('/ical', (req, res) => {
  https.get(ICAL_URL, (response) => {
    res.set('Content-Type', 'text/calendar');
    response.pipe(res);
  }).on('error', (err) => {
    res.status(500).send('Failed to fetch iCal: ' + err.message);
  });
});

app.get('/', (req, res) => {
  res.send('Property 236 iCal server is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
