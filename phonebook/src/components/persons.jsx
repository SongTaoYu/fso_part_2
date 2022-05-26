import React from "react"


const Persons = ({ person, setFilter, deleteName}) => {

  const checkPersonsName = setFilter === '' ?
    person
    :
    person.filter((p) => p.name.toLowerCase().includes(setFilter.toLowerCase()))

  return (checkPersonsName.map((person) => <li key={person.id}>{person.name} {person.number}<button onClick={deleteName} value = {person.id}> delete </button> </li>))

}


export default Persons