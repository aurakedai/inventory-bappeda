const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

// Routes for Karyawan CRUD

// CREATE karyawan
app.post('/karyawan', async (req, res) => {
  const { nama, jabatan, email, no_telepon, alamat } = req.body;
  try {
    const newKaryawan = await pool.query(
      'INSERT INTO karyawan (nama, jabatan, email, no_telepon, alamat) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [nama, jabatan, email, no_telepon, alamat]
    );
    res.json(newKaryawan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ semua karyawan
app.get('/karyawan', async (req, res) => {
  try {
    const allKaryawan = await pool.query('SELECT * FROM karyawan');
    res.json(allKaryawan.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ karyawan berdasarkan id
app.get('/karyawan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const karyawan = await pool.query('SELECT * FROM karyawan WHERE id_karyawan = $1', [id]);
    res.json(karyawan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE karyawan
app.put('/karyawan/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, jabatan, email, no_telepon, alamat } = req.body;
  try {
    const updateKaryawan = await pool.query(
      'UPDATE karyawan SET nama = $1, jabatan = $2, email = $3, no_telepon = $4, alamat = $5 WHERE id_karyawan = $6 RETURNING *',
      [nama, jabatan, email, no_telepon, alamat, id]
    );
    res.json(updateKaryawan.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE karyawan
app.delete('/karyawan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM karyawan WHERE id_karyawan = $1', [id]);
    res.json({ message: 'Karyawan deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
