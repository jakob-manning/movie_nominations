import React from "react";
import {movieInterface} from "../../Interfaces/MovieInterfaces";

interface Props {
    nominatedMovies: movieInterface[],
    removeNominationHandler: Function
}

const Nominations: React.FC<Props> = (props: Props) => {

    return (
        <div>
            {props.nominatedMovies.map(movie => (
                <div key={movie.imdbID}>
                    <h1>{movie.Title}</h1>
                    <p>{movie.Year}</p>
                    <button onClick={() => props.removeNominationHandler(movie.imdbID)}>Remove</button>
                </div>
            ))
            }
        </div>
    )
}

export default Nominations