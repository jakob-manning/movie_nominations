import React, {useEffect, useState} from "react";
import axios from "axios";

interface movieInterface {
    Poster?: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

const MovieList: React.FC = () => {
    const [movieList, setMovieList] = useState<movieInterface[]>([])
    const [Title, setMovietitle] = useState<string>()

    const apiKey = process.env.REACT_APP_IMDBKEY
    const ImdbBaseURL = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie`

    const searchHandler = async () => {
        try {
            const response: any = await axios.get(ImdbBaseURL + "&s=finding+nemo")
            console.log(response)
            if(response.data?.Search){
                setMovieList(response.data.Search)
            }

        } catch (e) {
            console.log(e)
        }
    }

    const searchResults = movieList.map( movie => (
        <div>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
        </div>
    ))

    return (
        <div className={"MovieList"}>
            <h1>Movie List Goes Here</h1>
            <button onClick={() => searchHandler()}>Search</button>
            <div>{searchResults}</div>
        </div>

    )
}

export default MovieList