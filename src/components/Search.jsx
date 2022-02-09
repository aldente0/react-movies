import React, {useState} from "react"
export function Search(props) {

	const {totalResults, getSearchValue, search, changeSearch} = props;

	/* const [search, setSearch] = useState(''); */
	const [filter, setFilter] = useState('all');

	const hanldeKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			getSearchValue(search, filter);
		}
	}
	
	const handleFilter = (e) => {
		setFilter(e.target.dataset.type)
		props.getSearchValue(search, e.target.dataset.type);
	}

	return <div className="row">
		<div className="input-field">
			<input 
				id="search"
				type="search"
				name="search"
				className="validate"
				placeholder="Search"
				onChange={(e) => {
					changeSearch(e.target.value);
					}
				}
				onKeyDown={hanldeKeyDown}
		/>
			
		<button className="btn search-btn #1a237e indigo darken-4 right" onClick={() => {getSearchValue(search, filter)}}>search</button>
	</div>
	<div className="radio-btns left">
		<p>
		<label>
				<input className="with-gap" name="filter"  type="radio" data-type='all' onChange={handleFilter} checked={filter === 'all'}/>
				<span>All</span>
			</label>
		</p>
		<p>
			<label>
				<input className="with-gap" name="filter" type="radio" data-type='movie' onChange={handleFilter} checked={filter === 'movie'}/>
				<span>Movies only</span>
			</label>
		</p>
		<p>
			<label>
				<input className="with-gap" name="filter"type="radio" data-type='series' onChange={handleFilter} checked={filter === 'series'}/>
				<span>Series only</span>
			</label>
		</p>
		</div>
		<div className="totalResults right">Matches found: {totalResults}</div>
	</div>
	
		
}