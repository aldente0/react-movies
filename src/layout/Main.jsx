import React from 'react';
import {Search} from '../components/Search';
import {Movies} from '../components/Movies';
import {Preloader} from '../components/Preloader';

const API_KEY = process.env.REACT_APP_API_KEY;


export class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
        totalResults: 0,
        searchValue: '',
        type: '',
    }

    getSearchValue = (searchValue = this.state.searchValue, type, pageNumber = 1) => {
        this.setState({loading: true});
        if (type === 'all') {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search,
                totalResults: Number(data.totalResults),
                loading: false,
                searchValue,
            }))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
        } else {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}&page=${pageNumber}`)
            .then(response => response.json())
            .then(data =>  this.setState({movies: data.Search,
                totalResults: Number(data.totalResults),
                loading: false,
                searchValue,
                type,
            }))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
        }
        
    }

    componentDidMount() {

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avenger`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search,
                totalResults: Number(data.totalResults),
                loading: false,
                searchValue: 'avenger',
            }))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
    }
    
    render() {
        const {movies, loading, totalResults} = this.state;

        return (
            <main className="content">
                <div className="container">
                <Search getSearchValue={this.getSearchValue} totalResults={totalResults}/>
                {
                    loading ? ( 
                        <Preloader/>
                    ) : (
                        <Movies movies={movies}/>
                    )
                }
                </div>
            </main>
        )
    }
    
}