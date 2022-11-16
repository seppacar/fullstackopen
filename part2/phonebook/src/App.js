import { useState, useEffect } from "react";

import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "", id: 0 });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const checkName = (obj) => obj.name === newPerson.name;
    if (persons.some(checkName)) {
      const currentPerson = persons.filter(
        (person) => person.name === newPerson.name
      );
      if (
        window.confirm(
          newPerson.name +
            " is already added to phonebook you want the replace the old number?"
        )
      ) {
        personService
          .update(currentPerson[0].id, newPerson)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id !== response.id ? person : response
            );
            setPersons(updatedPersons);
          });
      }
      return;
    }
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewPerson({ name: "", number: "" });
    });
  };

  const destroyPerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      personService.destroy(id).then(
        personService.getAll().then((initialPersons) => {
          setPersons(initialPersons);
        })
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        destroyPerson={destroyPerson}
      />
    </div>
  );
};

export default App;
