import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'


class SearchBar extends React.Component {

state = {term: ''};

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
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button &nbsp;
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
  </Dropdown>
    
  <div className>
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
                placeholder="wallpapers"
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
