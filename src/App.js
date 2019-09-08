import React from 'react';
import _ from 'lodash';
import './App.scss';

import Button from 'react-bootstrap/Button'

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
    page: 1,
    currentTerm: ''
  }

  onSearchSubmit = async (term) => {
    term = term + '.json';
    this.setState({ images: [] });
    const response = await fetch(`${this.state.BASE_URL}${term}`);
    const data = await response.json();
    if (!data.error) {   
        this.setState({
          page: 1, 
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
        //page: this.state.page - 1  
    });
  } 
  if (this.state.page <= 1) {
    return null;
  } else {
    this.setState({ page: this.state.page - 1})
  }
  }
  
  componentDidMount () {           
    this.onSearchSubmit(`wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper`);
  }

  // PREMADE SEARCH ENTRIES
  wallpapersOnSubmit = () => {
    this.onSearchSubmit(`wallpapers+wallpaper+widescreenwallpaper+wqhd_wallpaper`);
    this.setState({
      page: 1,
      currentTerm: 'wallpapers'
    });
  }

  animeOnSubmit = () => {           
    this.onSearchSubmit(`animemes`);
    this.setState({ 
      page: 1,
      currentTerm: 'animemes'
    });
  }

  mobileWallpapers = () => {
    this.onSearchSubmit(`mobilewallpapers`);
    this.setState({ 
      page: 1,
      currentTerm: 'mobilewallpapers'
    });
  }  

  widescreenWallpaper = () => {
    this.onSearchSubmit(`WidescreenWallpaper`);
    this.setState({ 
      page: 1,
      currentTerm: 'WidescreenWallpaper'
    });
  }

render() {
 
  const delayedSearch = _.debounce((term) => {this.onSearchSubmit(term)}, 300);
  let content;
  let prevButton;
  if (this.state.images.length > 0) {
    content = <div></div>
  } else {
    content = <div className="text-center wrap-content-fill">Loading...</div>
  }

  if (this.state.page !== 1) {
    prevButton = <Button className="input-group" variant="outline-success" onClick={this.prevPageSubmit}><span>Back</span></Button>
  } else {
    prevButton = <Button className="back__button" variant="outline-success"><span>Back</span></Button>
  }
  
  return (
    <React.Fragment>
      <SearchBar
      currentTerm={this.state.currentTerm}
      onSearchTermChange={delayedSearch} 
      anime={this.animeOnSubmit}
      widescreen={this.widescreenWallpaper}
      mobile={this.mobileWallpapers} 
      default={this.wallpapersOnSubmit}
      />
      <ImageList images={this.state.images} />
      <div className="container">
      <div className="row">
      <div className="col-lg-12 col-md-12 col-mx-auto">
      {content} 
      </div>
      <div className="col-4">  
      {prevButton}
      </div>
      <div className="col-4"> 
      <Button className="page__button">Page: {this.state.page}</Button>
      </div>
      <div className="col-4">  
      <Button className="next__button" variant="outline-success" onClick={this.nextPageSubmit}>Next</Button>
      </div>
      </div>
      </div>
    </React.Fragment>
  )
}
}

export default App;
