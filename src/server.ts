import express from 'express';
import { request } from 'http';

const app = express();
const port = 3000;

app.use(express.json());

const users = ['Iva', 'Mateo', 'Robert', 'Sascha'];

app.post('/api/users', (_request, response) => {
  response.send(_request.body);
});

app.delete('/api/users/:name', (_request, response) => {
  const index = users.indexOf(_request.params.name);
  if (index === -1) {
    response.status(404).send("User doesn't exist.");
    return;
  }

  users.splice(index, 1);
  response.send('Deleted.');
});

app.get('/api/users/:name', (_request, response) => {
  const isNameKnown = users.includes(_request.params.name);
  if (isNameKnown) {
    response.send(_request.params.name);
  } else {
    response.status(404).send("Sorry can't find that user!");
  }
});

/*app.get('/api/users/:name', (_request, response) => {
  response.send(_request.params.name);
});*/

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
