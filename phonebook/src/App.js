import { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/searchFilter'
import axios from 'axios'
import addName from './components/addName'
import './index.css'



const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [setFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {

    console.log("effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(function (response) {
        console.log(response.data)
      })

  }, [])

  const Notification = ({ message }) => {
    let style = 'success'
    if (message === null) {
      return null
    }
    if (message.error) style = "error"

    return (
      <div className= {style} >
        {message.text}
      </div>
    )
  }


  const handleOnSubmit = (event) => {
    console.log(event)

    event.preventDefault();
    const find = persons.find(persons => persons.name === newName)
    if (find === undefined) {
      addName(newName, newNumber, persons.length + 1, (responsedata) => { setPersons(persons.concat(responsedata)) })

      setErrorMessage({
        text: `Added ${newName}`,
        error: false
      })        
      setTimeout(() => { setErrorMessage(null) }, 5000)

    }
    else {
      if (window.confirm(newName + " has been added to phonebook, replace the old number with a new one?")) {
        changeNumber(newNumber, newName);
      }
      setNewName('')
      setNewNumber('')
    }
  }

  const changeNumber = (newNumber, newName) => {

    const index = persons.findIndex(person => {
      return (person.name == newName)
    })

    axios
      .put(`http://localhost:3001/persons/${index + 1}`, {
        name: persons[index].name,
        number: newNumber,
        id: persons[index].id
      })
      .then((response) => {
        console.log('%cApp.js line:66 response', 'color: #007acc;', response);
        setPersons(persons.map((person) => person.name == response.data.name ? response.data : person));
      })
      .catch(error => {
        setErrorMessage({
          text: `${newName} was already removed from server`,
          error: true
        }
          
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
      



  }

  const deleteName = (id) => {
    // ...
    const name = persons.find(element => {
      if (element.id == id.target.value)
        return (element);
    })

    if (window.confirm(`Do you really want to delete ${name.name} `)) {


      axios
        .delete(`http://localhost:3001/persons/${id.target.value}`)
        .then((response) => {
          console.log(response)
          setPersons(persons.filter(item => item.id != id.target.value));
        })
        .catch(function (response) {
          console.log(response.data)
        })

    }

  }

  const handleOnChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleOnChangeFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  return (

    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} />

        <Filter setFilter={setFilter} handleOnChangeFilter={handleOnChangeFilter} />

      </div>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleOnSubmit={handleOnSubmit}
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNumber={handleOnChangeNumber}

      />


      <h2>Numbers</h2>
      {
        <Persons person={persons} setFilter={setFilter} deleteName={deleteName} />
      }
    </div>

  )
}

export default App