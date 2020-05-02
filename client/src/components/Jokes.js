import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Jokes() {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:3300/api/jokes/', {
          headers: { authorization: 'bearer ' + localStorage.getItem("token")
        }
        })
        .then(res => {
            setJokes(res.data);
            console.log('jokes', res.data)
          })
          .catch(err => {
            console.log("invalid", err);
            console.log('you need to login first')
          });
      },[])

if (jokes.length) {
  return (
    <div className="App">

          {jokes.map(item => (
          <div>
          <p>{item.joke}</p>
          </div>
          ))}
          </div>
    )
  } else {
    return (
    <div className="App">
        <div><h1>You need to login before you can see the jokes!</h1></div>
    </div>
    )
  }
}