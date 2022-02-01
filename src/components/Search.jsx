import React from "react"

export class Search extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: 'all'
    }
  }

  hanldeKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      this.props.getSearchValue(this.state.search, this.state.filter);
    }
  }

  handleClick = () => {
    this.props.getSearchValue(this.state.search, this.state.filter)
  }
  
  handleFilter = (e) => {
    this.setState(() => ({filter: e.target.dataset.type}), () => {
      this.props.getSearchValue(this.state.search, this.state.filter);
    })
  }

  hanldeChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return <div className="row">
      <div className="input-field">
        <input 
          id="search"
          type="search"
          name="search"
          className="validate"
          placeholder="Search"
          onChange={this.hanldeChange}
          onKeyDown={this.hanldeKeyDown}
      />
       
      <button className="btn search-btn #1a237e indigo darken-4 right" onClick={this.handleClick}>search</button>
    </div>
    <div className="radio-btns left">
      <p>
      <label>
          <input className="with-gap" name="filter"  type="radio" data-type='all' onChange={this.handleFilter} checked={this.state.filter === 'all'}/>
          <span>All</span>
        </label>
      </p>
      <p>
        <label>
          <input className="with-gap" name="filter" type="radio" data-type='movie' onChange={this.handleFilter} checked={this.state.filter === 'movie'}/>
          <span>Movies only</span>
        </label>
      </p>
      <p>
        <label>
          <input className="with-gap" name="filter"type="radio" data-type='series' onChange={this.handleFilter} checked={this.state.filter === 'series'}/>
          <span>Series only</span>
        </label>
      </p>
      </div>
  </div>
  }
    
}