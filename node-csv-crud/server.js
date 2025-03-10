const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
app.use(express.json()); 

const csvFilePath = 'data.csv';

// Helper: Read CSV file and return an array of records.
function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!fs.existsSync(csvFilePath)) {
      // If file doesn't exist, resolve with an empty array.
      return resolve(results);
    }
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Helper: Write an array of records to CSV by first deleting the existing file.
function writeCSV(records) {
  return new Promise((resolve, reject) => {
    // Delete the file if it exists to ensure a clean write.
    if (fs.existsSync(csvFilePath)) {
      fs.unlinkSync(csvFilePath);
    }
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'age', title: 'age' }
      ]
    });
    csvWriter.writeRecords(records)
      .then(resolve)
      .catch(reject);
  });
}

// GET all records
app.get('/records', async (req, res) => {
  try {
    const records = await readCSV();
    res.json(records);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Error reading CSV file' });
  }
});

// CREATE a new record (adds to existing records)
app.post('/records', async (req, res) => {
  try {
    const newRecord = req.body; // Expected { id, name, age }
    const records = await readCSV();
    records.push(newRecord);
    await writeCSV(records);
    res.status(201).json({ message: 'Record created', record: newRecord });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ error: 'Error creating record' });
  }
});

// UPDATE a record by id (modifies the existing record)
app.put('/records/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body; // e.g., { name: "New Name", age: "35" }
    let records = await readCSV();
    let recordFound = false;

    records = records.map(record => {
      if (record.id === id) {
        recordFound = true;
        // Update the record by merging the updateData.
        return { ...record, ...updateData };
      }
      return record;
    });

    if (!recordFound) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await writeCSV(records);
    res.json({ message: 'Record updated', record: updateData });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ error: 'Error updating record' });
  }
});

// DELETE a record by id (removes the record entirely)
app.delete('/records/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const records = await readCSV();
    const filteredRecords = records.filter(record => record.id !== id);

    if (filteredRecords.length === records.length) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await writeCSV(filteredRecords);
    res.json({ message: 'Record deleted' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Error deleting record' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
