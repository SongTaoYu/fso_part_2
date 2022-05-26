import React from "react"

const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>
}

const Part = ({ courseDetails }) => {
  return <p>{courseDetails.name} {courseDetails.exercises}</p>
}

const Total = ({ parts }) => {

  const exercises = parts.map(part => part.exercises)
  const courseTotal = exercises.reduce((current, prev) => current + prev)
  
  return <h3>total of {courseTotal} exercises</h3>
}

const Course = ({ course }) => {
  return <>
    <Header courseName={course.name} />
    {
      course.parts.map((part, id) => <Part courseDetails={part} key={id} />)
    }
    <Total parts={course.parts} />
  </>
}

const Courses = ({ courses }) => {  
  return <>
    {
      courses.map((course, id) => <Course course={course} key={id} />)
    }
  </>
}

export default Courses