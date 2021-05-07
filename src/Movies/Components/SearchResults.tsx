import React from "react";
import {movieInterface} from "../../Interfaces/MovieInterfaces";

interface Props {
    movieList: movieInterface[],
    nominateHandler: Function
}

const MovieSearch: React.FC<Props> = (props: Props) => {

    return (
        <div>
            {props.movieList.map(movie => (
                <div key={movie.imdbID}>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Year}</p>
                    <button onClick={() => props.nominateHandler(movie)}>Nominate Movie</button>
                </div>
            ))}
        </div>
    )
}

export default MovieSearch