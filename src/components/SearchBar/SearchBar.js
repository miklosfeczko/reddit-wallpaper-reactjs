import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'


class SearchBar extends React.Component {

state = {
  term: ''
};

onSearchChange(term) {
  this.setState({ term });
  this.props.onSearchTermChange(term);
}


render() {
  return (
  <div className="container">
  <div className="row">
  <div className="col-lg-12 col-md-12 col-mx-auto">
  <br/>

  <Dropdown>
    <Dropdown.Toggle variant="outline-success">
      r/{this.props.currentTerm} &nbsp;
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={this.props.default}>r/wallpapers</Dropdown.Item>
      <Dropdown.Item onClick={this.props.anime}>r/animemes</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    
  <div>
    <div className="input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">r/</div>
            </div>
            <input 
            type="text" 
            className="form-control" 
            onChange={e => this.onSearchChange(e.target.value)} 
            value={this.state.term} 
            name="search" 
            placeholder="Type here to search"
            spellCheck="false"
            />
    </div>
  </div>

 
  
  </div>
  </div>
  </div>
  );
  }
}


export default SearchBar;
