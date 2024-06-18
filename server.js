const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/daftarBuku', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/daftarBuku.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/profile.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/signUp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/signUp.html'));
});

app.get('/detailBuku/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/detailBuku.html'));
});


app.get('/api/book/:id', (req, res) => {
  const bookId = req.params.id; 

  fs.readFile(path.join(__dirname, '/public/data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const books = JSON.parse(data).books;
      const book = books.find(b => b.id === parseInt(bookId));

      if (!book) {
        console.error('Book not found:', bookId);
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      // Kirim data buku sebagai respons JSON
      res.json(book);
    } catch (error) {
      console.error('Error parsing data.json:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


app.get('/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/data.json'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
