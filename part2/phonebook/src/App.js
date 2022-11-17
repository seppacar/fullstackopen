import { useState, useEffect } from "react";

import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "", id: 0 });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Pull phonebook data from json-server
  // and store it to the "persons" variable
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setNotification({
          message: `Cannot render list ${error.message}`,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      });
  }, []);

  // Add a new person to the phonebook if input name is not already been in the phonebook
  // if name is present in the list ask user to update the related phone number
  // then re-render persons list
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
          })
          .then(() => {
            setNotification({
              message: `Phone number of ${newPerson.name} updated`,
              type: "success",
            });
            setTimeout(() => {
              setNotification({ message: "", type: "" });
            }, 5000);
          })
          .catch(() => {
            setNotification({
              message: `${newPerson.name} already been deleted from server`,
              type: "error",
            });
            setTimeout(() => {
              setNotification({ message: "", type: "" });
            }, 5000);
          });
      }
      return;
    }
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });
      })
      .then(() => {
        setNotification({
          message: `${newPerson.name} added to the phonebook`,
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      })
      .catch((error) => {
        setNotification({
          message: `Cannot add ${newPerson.name} to the list due to ${error.message}`,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 5000);
      });
  };

  // Delete a person from the phonebook
  const destroyPerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      personService
        .destroy(id)
        .then(
          setPersons(
            persons.filter((person) => {
              return person.id !== id;
            })
          )
        )
        .then(() => {
          setNotification({
            message: `${name} deleted from the list`,
            type: "success",
          });
          setTimeout(() => {
            setNotification({ message: "", type: "" });
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Cannot delete ${name} to the list due to ${error.message}`,
            type: "error",
          });
          setTimeout(() => {
            setNotification({ message: "", type: "" });
          }, 5000);
        });
    }
  };

  // Handle new person form changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };
  // Handle filter query changes
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
