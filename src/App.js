import React from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar'
import ImageList from './components/ImageList/ImageList'

class App extends React.Component {

render() {
  
  return (
    <div>
      Hello from App!
      <SearchBar />
      <ImageList />
    </div>
  )
}
}

export default App;
