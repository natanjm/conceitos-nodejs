const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require('uuidv4');

const app = express();

function verifyID(request, response, next){
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID.' })
  }

  return next()
}

app.use("/repositories/:id", verifyID);
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
    const {url, title, techs} = request.body;
    const repository = {id: uuid(), url, title, techs, likes: 0};
    repositories.push(repository);
    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id, likes } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
    const {id} = request.params;
    const {url, title, techs} = request.query;

    const repositoryID = repositories.findIndex(repository => repository.id == id);
    if(repositoryID<0){
      return response.status(400).json({error: 'Repository not found.'});
    }
    repositories.splice(repositoryID, 1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
    const {id} = request.params;
    const repository = repositories.find(repository => repository.id == id);
    if(!repository){
      return response.status(400).send();
    }
    repository.likes++; 
    return response.json(repository);
});

module.exports = app;
