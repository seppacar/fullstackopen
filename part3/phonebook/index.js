require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  /*
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (Person.find(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
*/

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number();
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (request, response) => {
  Person.find({})
    .then((people) => {
      response.send(
        `<p>Phonebook has info for ${
          people.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
