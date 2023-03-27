const express = require('express');
const app = express();
app.use(express.json());


const port = 3000;
const books = [];
let nextId = 1;

app.get('/', (req, res) => {
	res.send('Bem vindo à biblioteca!');
});

app.get('/books', (req, res) => {
	res.status(200).send(books);
});


app.post('/books', (req, res) => {
	const book = {
		id: nextId++,
		name: req.body.name,
		author: req.body.author,
		year: req.body.year,
		genre: req.body.genre,
	};
	books.push(book);
	res.status(201).send(book);
});

app.put('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const book = books.find(u => u.id === id);
	if (!book) {
		return res.status(404).send('Livro não encontrado');
	}
	book.name = req.body.name || book.name;
	book.author = req.body.author || book.author;
	book.year = req.body.year || book.year;
	book.genre = req.body.genre || book.genre;
	res.status(200).send(book);
});


app.delete('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = books.findIndex(u => u.id === id);
	if (index === -1) {
		return res.status(404).send('Livro não encontrado');
	}
	books.splice(index, 1);
	res.status(204).send();
});


app.patch('/books/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const book = books.find(u => u.id === id);
	if (!book) {
		return res.status(404).send('Livro não encontrado');
	}
	if (req.body.name) {
		book.name = req.body.name;
	}
	if (req.body.author) {
		book.author = req.body.author;
	}
	if (req.body.year) {
		book.year = req.body.year;
	}
	if (req.body.genre) {
		book.genre = req.body.genre;
	}
	res.status(200).send(book);
});


app.options('/books', (req, res) => {
	res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.status(200).send();
});


app.head('/books', (req, res) => {
	res.setHeader('X-Total-Count', books.length);
	res.status(200).send();
});



app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});