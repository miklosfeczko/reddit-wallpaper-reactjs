import React from 'react';
import _ from 'lodash';
import './App.scss';

import SearchBar from './components/SearchBar/SearchBar'
import ImageList from './components/ImageList/ImageList'

class App extends React.Component {
  state = {
    images: [],
    BASE_URL: '//www.reddit.com/r/',
    after: '',
    NEW_URL: '',
    FIRST_URL: ''
  }

  onSearchSubmit = async (term) => {
    term = term + '.json' + '?after=';
    this.setState({ images: [] });
    const response = await fetch(`${this.state.BASE_URL}${term}`);
    const data = await response.json();
    console.log(response);
    if (!data.error) {   
        this.setState({ 
          images: data.data.children,
          after: data.data.after,
          NEW_URL: response.url,
          FIRST_URL: response.url
        });  
    }console.log(this.state.after); console.log(this.state.NEW_URL)
  }

  nextPageSubmit = async () => {
    this.setState({ images: [] });
    const response = await fetch(`${this.state.NEW_URL}${this.state.after}`);
    const data = await response.json();
    if (!data.error) {  
      this.setState({ 
        images: data.data.children,
        after: data.data.after,
        NEW_URL: this.state.FIRST_URL  
    });
  }  console.log(this.state.NEW_URL, 'NEW_URL');
  }
  
  componentDidMount () {           
    this.onSearchSubmit(`wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper`);
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
      <button onClick={this.nextPageSubmit}>LOL TRYHARD</button>
    </React.Fragment>
  )
}
}

export default App;
