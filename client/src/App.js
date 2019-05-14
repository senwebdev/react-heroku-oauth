import React from 'react';
import queryString from 'query-string';

import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  fetchUserInfo(code, secret){
    if(code && secret) {
      axios.post("https://react-oauth-test.herokuapp.com/user?code="+code+"&secret="+secret)
      .then(result => console.log(result.data))
      .catch(() => console.log("Can't access response. Blocked by browser?"))
    } else {
      console.log("Error!")
    }
  }



  async componentDidMount() {
    let query = await queryString.parse(window.location.search);
    console.log(query.code);
    var secret = "b09e772d-3037-4f8b-9067-bac2ed9f550e";
    this.fetchUserInfo(query.code, secret);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a href="https://id.heroku.com/oauth/authorize?client_id=9515836f-5ea1-46ae-98cb-b54754291d54&response_type=code&&scope=global&state=">Login with Heroku</a>
        </header>
      </div>
    );
  }
}

export default App;
