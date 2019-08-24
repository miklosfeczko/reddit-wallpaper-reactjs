import React from 'react';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar'
import ImageList from './components/ImageList/ImageList'

class App extends React.Component {
  state = {
    images: [],
    BASE_URL: '//www.reddit.com/r/'
  }

  onSearchSubmit = async (term) => {
    const response = await fetch(`${this.state.BASE_URL}${term}.json`);
    const data = await response.json();
    this.setState({ images: data.data.children });
    console.log(this.state.images);
  }

render() {
  
  return (
    <div>
      Hello from App!
      <SearchBar onSubmit={this.onSearchSubmit} />
      <ImageList />
    </div>
  )
}
}

export default App;
