import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {

  componentDidMount(){
  }

  handleDummy(){
    let token = localStorage.getItem('token');
    debugger
    fetch('http://localhost:3000/api/v1/dummy', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, 
      }
           
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleGetGameTypes()
  {
    let token = localStorage.getItem('token');    
    fetch('http://localhost:3000/api/v1/games', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, 
      }           
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleGetUserGames()
  {
    let token = localStorage.getItem('token');    
    fetch('http://localhost:3000/api/v1/user_games', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, 
      }
           
    })
    .then(res => res.json())
    .then(console.log)
  }

  handleNewGame() {
    let token = localStorage.getItem('token');    
    fetch('http://localhost:3000/api/v1/newgame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          game_type: "1"         
        }      
      })     
    })
    .then(res => res.json())
    .then(console.log)
  }

  createUser(name, password, country, avatar){
    debugger
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: name,
          password: password,
          country: "USA",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/4/49/Syvia_of_Sylvia%27s_reaturant_N.Y.C_%28cropped%29.jpg"
        }
      })
    })
    .then(r => r.json())
    .then(json => this.storeToken(json))
  }   

  handleCreateUser = (event) =>{
    event.preventDefault()    
    let name = event.target.children[0].value
    let password = event.target.children[1].value
    debugger
    this.createUser(name,password)
  }

  loginUser(name, password)
  {
    //debugger
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: name,
          password: password,          
        }
      })
    })
    .then(r => r.json())
    .then(json => this.storeToken(json))
  }

  handleLogin = (event) =>{
    event.preventDefault()    
    let name = event.target.children[0].value
    let password = event.target.children[1].value
    //debugger
    this.loginUser(name,password)
  }

  handleLogout = (event) => {
    localStorage.clear();
    console.log("Logged out - cleared localStorage")
  }

  

  storeToken(json)
  {    
    localStorage.setItem('token', json.jwt)
  }
  

  render() {
    return (      
        <div className="App">
          <form onSubmit={this.handleCreateUser}>
            <input type="text" />
            <input type="password" name="password"></input>
            <input type="submit" value="Create User"/>
          </form>
          <form onSubmit={this.handleLogin}>
            <input type="text" />
            <input type="password" name="password"></input>
            <input type="submit" value="Login" />
          </form>
          <button onClick={this.handleNewGame}>
          Create Game
          </button>
          <button onClick={this.handleLogout}>
          Logout
          </button>
          <button onClick={this.handleGetUserGames}>
          Get User Games
          </button>
          <button onClick={this.handleGetGameTypes}>
          Get Game Types
          </button>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
}

// export default App;
