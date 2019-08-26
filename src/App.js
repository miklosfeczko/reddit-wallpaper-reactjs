import React from 'react';
import _ from 'lodash';
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
    console.log(data);
  
    if (!data.error) {   
        this.setState({ images: data.data.children });  
    }
  }

  componentDidMount () {           
    this.onSearchSubmit('wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper');
  }

render() {
  const delayedSearch = _.debounce((term) => {this.onSearchSubmit(term)}, 300);
  
  return (
    <React.Fragment>
      <SearchBar onSearchTermChange={delayedSearch} placeholderText={'Search'} anime={this.sortButtonAnimeme}/>
      <ImageList images={this.state.images} />
    </React.Fragment>
  )
}
}

export default App;
