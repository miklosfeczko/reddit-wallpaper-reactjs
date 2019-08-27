import React from 'react';
import _ from 'lodash';
import './App.scss';

import SearchBar from './components/SearchBar/SearchBar'
import ImageList from './components/ImageList/ImageList'

class App extends React.Component {
  state = {
    images: [],
    BASE_URL: '//www.reddit.com/r/'
  }

  onSearchSubmit = async (term) => {
    this.setState({ images: [] });
    const response = await fetch(`${this.state.BASE_URL}${term}.json`);
    const data = await response.json();
  
    if (!data.error) {   
        this.setState({ images: data.data.children });  
    }
  }

  componentDidMount () {           
    this.onSearchSubmit('wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper');
  }

render() {
 
  const delayedSearch = _.debounce((term) => {this.onSearchSubmit(term)}, 300);
  let content;
  if (this.state.images.length > 0) {
    content = <div></div>
  } else {
    content = <div>Loading...</div>
  }
  
  return (
    <React.Fragment>
      <SearchBar onSearchTermChange={delayedSearch} placeholderText={'Search'} anime={this.sortButtonAnimeme}/>
      <ImageList images={this.state.images} />
      {content}
    </React.Fragment>
  )
}
}

export default App;
