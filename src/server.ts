import express from 'express';

const app = express();
const port = 3000;

const users = ['Iva', 'Mateo', 'Robert', 'Sascha'];

app.delete('/api/users/:name', (_request, response) => {
  const name = _request.params.name;
  const index = users.indexOf(name);
  if (index !== -1) {
    users.splice(index, 1);
    response.send(`${name} is deleted.`);
  } else {
    response.status(404).send('This Person was not found in the Database');
  }
});

app.get('/api/users/:name', (_request, response) => {
  const isNameKnown = users.includes(_request.params.name);
  if (isNameKnown) {
    response.send(_request.params.name);
  } else {
    response.status(404).send("Sorry can't find that!");
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
