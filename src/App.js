import axios from "axios";
import React, { Component, useEffect } from "react";
import './App.css';

class Subject extends Component{
  render(){
    return(
      <header>React x nodeJS</header>
    );
  }
}

function App() {
  const callApi = async () => {
    axios.get("/").then((res) => console.log(res.data));
  };

  useEffect(()=>{
    callApi();
  }, []);

  return (<div className="App">
    <Subject></Subject>
    </div>);
}

export default App;
