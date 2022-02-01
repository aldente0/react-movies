import React from "react";
import { Movie } from "./Movie";

export function Movies(props) {
    const {movies = []} = props;

    return <div className="movies">
        {movies.length ? (
            movies.map(movie => {
                return <Movie key={movie.imdbID} {...movie}/>
            })
        ) : (
            <h3 className="not-found">Not found</h3>
        )}
        
        
    </div>
}