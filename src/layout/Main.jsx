import React, {useState, useEffect} from 'react';
import {Search} from '../components/Search';
import {Movies} from '../components/Movies';
import {Preloader} from '../components/Preloader';
import {Pages} from '../components/Pages';

const API_KEY = process.env.REACT_APP_API_KEY;

function getPages(requestResult) {

    const result = Math.ceil(requestResult / 10);
    let pgs = [];
    let i = 1;

    while (i <= result) {
        pgs = pgs.concat(i);
        i = i + 1;
    }

    return pgs;
}


export function Main() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('avenger');
    const [type, setType] = useState('all')

    const changeSearch = (request) => {
        setSearchValue(request);
    }

    const changePage = ( searchValue, type, numberPage) => {
        setLoading(true);
        if (numberPage === 1 && type === 'all') {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                setMovies( data.Search );
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
        } else if (numberPage === 1 && type !== 'all') {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}`)
            .then(response => response.json())
            .then(data => {
                    setMovies(data.Search);
                    setLoading(false);
                } 
            )
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
        } else if (type !== 'all' && numberPage !== 1) {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}&page=${numberPage}`)
                .then(response => response.json())
                .then(data => {
                        setMovies(data.Search);
                        setLoading(false);
                        setCurrentPage(numberPage);
                    } 
                )
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                })
        } else if (type === 'all' && numberPage !== 1) {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&page=${numberPage}`)
                .then(response => response.json())
                .then(data => {
                        setMovies(data.Search);
                        setLoading(false);
                        setCurrentPage(numberPage);
                    } 
                )
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                })
        }
    }

    const getSearchValue = ( searchValue, type ) => {
        setLoading(true);
        if (type === 'all') {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                setMovies( data.Search );
                setTotalResults(Number(data.totalResults));
                setLoading(false);
                setSearchValue(searchValue);
                setType('all');
                setPages(getPages(Number(data.totalResults)));
                setCurrentPage(1);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
        } else {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&type=${type}`)
            .then(response => response.json())
            .then(data => {
                    setMovies(data.Search);
                    setTotalResults(Number(data.totalResults));
                    setLoading(false);
                    setSearchValue(searchValue);
                    setType('all');
                    setPages(getPages(Number(data.totalResults)));
                    setCurrentPage(1);
                } 
            )
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
        }
        
    }

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.Search);
                setTotalResults(Number(data.totalResults));
                setSearchValue('avenger');
                setLoading(false);
                setPages(getPages(Number(data.totalResults)));
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }, []);
    
    

    return (
        <main className="content">
            <div className="container">
            <Search getSearchValue={getSearchValue} totalResults={totalResults} search={searchValue} changeSearch={changeSearch}/>
            {
                loading ? ( 
                    <Preloader/>
                ) : (
                    <Movies movies={movies}/>
                )
            }
            <Pages pages={pages} searchValue={searchValue} type={type} currentPage={currentPage}  changePage={changePage}></Pages>
            </div>
        </main>
    )
    
}