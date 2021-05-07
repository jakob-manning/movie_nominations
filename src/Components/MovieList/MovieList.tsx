import React, {FormEvent, useEffect, useState} from "react";
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
    const [formValues, setFormValues] = useState({title: ""})
    const [nominatedMovies, setNominatedMovies] = useState<movieInterface[]>([])
    const [errorMessage, setErrorMessage] = useState("")

    const apiKey = process.env.REACT_APP_IMDBKEY
    const ImdbBaseURL = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie`

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("")
        setMovieList([])
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value

        setFormValues({...formValues, [name]: value})
    }

    useEffect(() => {
        if (formValues.title.length > 3) {
            searchHandler()
        }
    }, [formValues])

    const searchHandler = async (event?: FormEvent) => {
        event?.preventDefault()
        setErrorMessage("")

        try {
            const response: any = await axios.get(ImdbBaseURL + "&s=" + formValues.title)
            console.log(response)
            if (response.data?.Search) {
                // imdb search sometimes returns multiple items with the same ID. Not sure why this is, but we can filter them out
                const movieIDs: string[] = []
                let uniqueMovies = response.data?.Search.filter((movie: movieInterface) => {
                    if (movieIDs.find(id => id === movie.imdbID)) {
                        return false
                    }
                    movieIDs.push(movie.imdbID)
                    return true
                })
                console.log(uniqueMovies)
                setMovieList(uniqueMovies)
            }

            if (response.data?.Response === "False") {
                setMovieList([])
                if (response.data?.Error === "Movie not found!") {
                    setErrorMessage("No movie meets that search criteria")
                }
            }

        } catch (e) {
            console.log(e)
            //ToDo - display toast with error message
        }


    }

    const nominateHandler = (movie: movieInterface) => {
        //Limit to five movies
        if (nominatedMovies.length === 5) {
            // TODO: display warning toast
            return
        }

        // Screen for duplicates
        if (nominatedMovies.find(item => item.imdbID === movie.imdbID)) {
            return;
        }

        setNominatedMovies([...nominatedMovies, movie])
    }

    const removeNominationHandler = (movieID: string) => {
        setNominatedMovies(nominatedMovies.filter(movie => movie.imdbID != movieID))
    }

    const nominatedMovieResults = nominatedMovies.map(movie => (
        <div key={movie.imdbID}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <button onClick={() => removeNominationHandler(movie.imdbID)}>Remove</button>
        </div>
    ))

    const searchResults = movieList.map(movie => (
        <div key={movie.imdbID}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <button onClick={() => nominateHandler(movie)}>Nominate Movie</button>
        </div>
    ))

    return (
        <div className={"MovieList"}>
            <p>{errorMessage}</p>
            <h1>Movie List Goes Here</h1>
            <form onSubmit={(event) => searchHandler(event)}>
                <input name={"title"}
                       value={formValues.title}
                       typeof={"text"}
                       placeholder={"movie title..."}
                       onInput={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event)}
                />
                <input type="submit"
                       value="Submit"
                />
            </form>
            <div>{searchResults}</div>
            <h1>Nominated Movies</h1>
            <div>{nominatedMovieResults}</div>
        </div>

    )
}

export default MovieList