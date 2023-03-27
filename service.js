const express = require('express');
const app = express();
app.use(express.json());


const port = 3000;
const users = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.status(200).send(users);
  });
// endpoint POST
app.post('/users', (req, res) => {
    const user = {
      id: nextId++,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    users.push(user);
    res.status(201).send(user);
  });
  
// endpoint PUT
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    res.status(200).send(user);
  });

// endpoint DELETE
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).send('Usuário não encontrado');
    }
    users.splice(index, 1);
    res.status(204).send();
  });
  

// endpoint PATCH
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    res.status(200).send(user);
  });

// endpoint OPTIONS
app.options('/users', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.status(200).send();
  });


// Endpoint HEAD de usuários
app.head('/users', (req, res) => {
    res.setHeader('X-Total-Count', users.length);
    res.status(200).send();
  });
  


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//Observe que adicionei a função .status() com o valor adequado para cada endpoint. Para o endpoint POST, utilizei o código de status HTTP 201 Created, indicando que um novo recurso foi criado com sucesso. Para o endpoint PUT, utilizei o código de status HTTP 200 OK, indicando que a requisição foi processada com sucesso. Para o endpoint DELETE, utilizei o código de status HTTP 204 No Content, indicando que a requisição foi processada com sucesso, mas não há conteúdo para ser retornado. Para o endpoint PATCH, utilizei o código de status HTTP 200 OK, indicando que a requisição foi processada com sucesso. Para o endpoint OPTIONS, utilizei o código de status HTTP 200 OK, indicando que a requisição foi processada com sucesso. Para o endpoint HEAD, utilizei o código de status HTTP 200 OK, indicando que a requisição foi processada com sucesso.
