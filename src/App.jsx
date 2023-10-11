
import { useEffect, useState } from 'react'
import './App.css'

function App() {
 
  const [users , setUser]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res=> res.json())
    .then(data=> setUser(data))
  },[])

  const handelSubmit = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = {name,email}
    console.log(user)
    fetch('http://localhost:5000/user',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data=> {
     
      const newUser = [...users,data];
      setUser(newUser);
      form.reset();
    })
  }

  return (


    

    <>
     
      <h1>Manage Data ({users.length} users) </h1>

      <form onSubmit={handelSubmit}>
        <input name='name' id='' type="text" />
        <br />
        <input name='email' id='' type="email" />
        <br />
        <input value="add user" type="submit" />
      </form>

      {users.map((userData, index) => (
        <li key={index}>{userData.name}</li>
      ))}
    </>
  )
}

export default App
