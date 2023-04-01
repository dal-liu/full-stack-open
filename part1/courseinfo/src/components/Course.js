const Content = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  )

  return (
    <div>
      {parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
