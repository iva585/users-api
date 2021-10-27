import express from 'express';

const app = express();
const port = 3000;

//Middleware for parsing aplication/json
app.use(express.json());

const users = [
  {
    name: 'Iva',
    username: 'iva585',
    password: '123',
  },
  {
    name: 'Mateo',
    username: 'mateo585',
    password: 'tete2',
  },
  {
    name: 'Robert',
    username: 'robi585',
    password: '176',
  },
  {
    name: 'Sascha',
    username: 'sale',
    password: '213',
  },
];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (!newUser.name || !newUser.username || !newUser.password) {
    response.status(400).send('Something is misssing.');
    return;
  } else if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(400).send('Wrong type.');
    return;
  }
  const newUserName = newUser.username;
  if (users.some((user) => user.username === newUserName)) {
    response.status(409).send('User already exists.');
  } else {
    users.push(newUser);
    response.send(`${newUser.name} added.`);
  }
});

app.delete('/api/users/:username', (request, response) => {
  const deleteUser = users.findIndex(
    (user) => user.username === request.params.username
  );
  if (deleteUser !== -1) {
    users.splice(deleteUser, 1);
    response.send('Deleted.');
  } else {
    response.status(404).send("User doesn't exist.");
    return;
  }
});

app.get('/api/users/:name', (request, response) => {
  const user = users.find((user) => user.username === request.params.name);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send("Sorry can't find that user!");
  }
});

app.post('/api/login', (request, response) => {
  const credentials = request.body;
  const existingUser = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );
  if (existingUser) {
    response.send('Logged in.');
  } else {
    response.status(404).send('Password or username incorrect.');
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
