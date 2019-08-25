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
    console.log(data);
  
    if (!data.error) {  
      if (!data.data.children[0].data.preview !== true) { // valid thread without pic fix.
        if (!data.data.children[0].data.preview.enabled !== true) {
        this.setState({ images: data.data.children });
        }
    }
    }
  }

  componentDidMount () {           
    this.onSearchSubmit('wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper');
  }

render() {
  
  return (
    <React.Fragment>
      <SearchBar onSubmit={this.onSearchSubmit} />
      <ImageList images={this.state.images} />
    </React.Fragment>
  )
}
}

export default App;
