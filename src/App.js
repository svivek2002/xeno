// src/App.js
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [totalSpends, setTotalSpends] = useState('');
  const [maxVisits, setMaxVisits] = useState('');
  const [notVisitedInMonths, setNotVisitedInMonths] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);

  const createAudience = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/audience', {
        totalSpends: Number(totalSpends),
        maxVisits: Number(maxVisits),
        notVisitedInMonths: Number(notVisitedInMonths),
      });
      setAudienceSize(response.data.audienceSize);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  

  const sendCampaign = async () => {
    await axios.post('http://localhost:3001/api/send-campaign', { audience: [] });
    alert('Campaign Sent');
  };

  return (
    <div>
      <h1>Create Audience</h1>
      <input type="number" placeholder="Total Spends" value={totalSpends} onChange={e => setTotalSpends(e.target.value)} />
      <input type="number" placeholder="Max Visits" value={maxVisits} onChange={e => setMaxVisits(e.target.value)} />
      <input type="number" placeholder="Not Visited In Months" value={notVisitedInMonths} onChange={e => setNotVisitedInMonths(e.target.value)} />
      <button onClick={createAudience}>Check Audience Size</button>
      {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      <button onClick={sendCampaign}>Send Campaign</button>
    </div>
  );
}

export default App;
