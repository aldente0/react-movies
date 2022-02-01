import React from 'react';
import {Search} from '../components/Search';
import {Movies} from '../components/Movies';
import {Preloader} from '../components/Preloader';

const API_KEY = process.env.REACT_APP_API_KEY;


export class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    }

    getSearchValue = (searchValue, type) => {
        this.setState({loading: true});
        if (type === 'all') {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
        } else {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
        }
        
    }

    componentDidMount() {

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avenger`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
            .catch((err) => {
                console.error(err);
                this.setState({loading: false});
            })
    }

    componentDidUpdate() {
    }
    
    render() {
        const {movies, loading} = this.state;

        return (
            <main className="content">
                <div className="container">
                <Search getSearchValue={this.getSearchValue}/>
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