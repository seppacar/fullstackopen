const Header = (header) => {
  console.log(header)
  return <h1>{header.course_name}</h1>;
};

const Content = (props) => {
  return props.parts.map((a, key) => {
    return <Part key={key} name={a.name} exercises={a.exercises} />;
  });
};

const Part = (part) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = (content) => {
  let sum = 0;
  content.parts.forEach((element) => {
    sum += element.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
