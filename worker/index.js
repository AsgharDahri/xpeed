const express = require('express');
const cors = require('cors');
const speedTest = require('speedtest-net'); // You can use a package like speedtest-net

const app = express();
app.use(cors({
  origin: '*'
}));

app.get('/speed', async (req, res) => {
  try {
    const test = await speedTest();
    
    res.status(200).json({ data:test});
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
