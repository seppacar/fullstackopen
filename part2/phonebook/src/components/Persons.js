const Persons = ({ persons, filter, destroyPerson }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        .map((person) => (
          <p key={person.id}>
            {" "}
            {person.name} {person.number}{" "}
            <button onClick={() => destroyPerson(person.id, person.name)}>
              delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
