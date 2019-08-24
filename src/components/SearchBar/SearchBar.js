import React, { Component } from 'react'

class SearchBar extends Component {
    state = {term: ''}

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <div>
               <form
               onSubmit={this.onFormSubmit}
               >
                  <input
                  value={this.state.term}
                  onChange={e => this.setState({ term: e.target.value })}
                  type="text" 
                  /> 
               </form>
            </div>
        )
    }
}

export default SearchBar;
