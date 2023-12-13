const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to read data from a specified file
app.get('/readFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const data = await fs.readFile(filename, 'utf-8');
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to write data to a specified file
app.post('/writeFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    await fs.writeFile(filename, JSON.stringify(data), 'utf-8');
    res.json({ message: 'Data written successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update data in a specified file
app.put('/updateFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    const existingData = await fs.readFile(filename, 'utf-8');
    const newData = JSON.parse(existingData).concat(data);

    await fs.writeFile(filename, JSON.stringify(newData), 'utf-8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
