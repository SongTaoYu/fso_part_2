import axios from "axios"
  const addName= (
     name,
     number,
     id,
     callback
     ) => {
    const nameObject =
    {
      name,
      number,
      id,
    }

    axios 
      .post('http://localhost:3001/persons', nameObject)
      .then (response => {
        callback(response.data)
        
        
      })
      .catch(response => {
        console.log(response.data)
      })
  }

  export default addName 