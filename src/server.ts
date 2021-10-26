import express from 'express';

const app = express();
const port = 3000;

app.get('/users/:name', (_request, response) => {
  response.send(_request.params.name);
});

app.get('/users', (_request, response) => {
  const users = ['Iva', 'Mateo', 'Robert', 'Sascha'];
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
