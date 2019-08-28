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
    before: '',
    NEW_URL: '',
    FIRST_URL: '',
    page: 1
  }

  onSearchSubmit = async (term) => {
    term = term + '.json';
    this.setState({ images: [] });
    const response = await fetch(`${this.state.BASE_URL}${term}`);
    const data = await response.json();
   
    if (!data.error) {   
        this.setState({ 
          images: data.data.children,
          after: data.data.after,
          before: data.data.before,
          NEW_URL: response.url,
          FIRST_URL: response.url
        });  
    }
  }

  nextPageSubmit = async () => {
    this.setState({ images: [] });
    const response = await fetch(`${this.state.NEW_URL}?count=${this.state.page * 25}&after=${this.state.after}`);
    
    const data = await response.json();
   
    if (!data.error) {  
      this.setState({ 
        images: data.data.children,
        after: data.data.after,
        before: data.data.before,
        NEW_URL: this.state.FIRST_URL,
        page: this.state.page + 1
    });
  }
  }

  
  prevPageSubmit = async () => {
    this.setState({ images: [] });
    const response = await fetch(`${this.state.NEW_URL}?count=${((this.state.page - 1) * 25) -1}&before=${this.state.before}`);
   
    const data = await response.json();
    if (!data.error) {  
      this.setState({ 
        images: data.data.children,
        after: data.data.after,
        before: data.data.before,
        NEW_URL: this.state.FIRST_URL,
        page: this.state.page - 1  
    });
  } 
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
      <button onClick={this.nextPageSubmit}>NEXT PAGE</button>
      <button onClick={this.prevPageSubmit}>PREV PAGE</button>
    </React.Fragment>
  )
}
}

export default App;
