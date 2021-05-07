import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import SearchResults from "../Components/SearchResults";
import Nominations from "../Components/Nominations";
import {Heading, Text, Box, InputGroup, InputLeftElement, Input, Button, Container, useToast} from "@chakra-ui/react"
import {SearchIcon} from '@chakra-ui/icons'

const MovieSearch: React.FC = () => {
    const [movieList, setMovieList] = useState<movieInterface[]>([])
    const [formValues, setFormValues] = useState({title: ""})
    const [nominatedMovies, setNominatedMovies] = useState<movieInterface[]>([])
    const [searchError, setSearchError] = useState<boolean>(false)
    const toast = useToast()

    const apiKey = process.env.REACT_APP_IMDBKEY
    const ImdbBaseURL = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie`

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchError(false)
        setMovieList([])
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value

        setFormValues({...formValues, [name]: value})
    }

    const searchHandler = useCallback(async (event?: FormEvent) => {
        event?.preventDefault()
        setSearchError(false)

        try {
            const response: any = await axios.get(ImdbBaseURL + "&s=" + formValues.title)
            console.log(response)
            if (response.data?.Search) {

                // IMDB sometimes returns multiple entries - Remove duplicates by checking ID
                const movieIDs: string[] = []
                let uniqueMovies = response.data?.Search.filter((movie: movieInterface) => {
                    if (movieIDs.find(id => id === movie.imdbID)) {
                        return false
                    }
                    movieIDs.push(movie.imdbID)
                    return true
                })

                setMovieList(uniqueMovies.slice(0,4))
            }

            if (response.data?.Response === "False") {
                setMovieList([])
                if (response.data?.Error === "Movie not found!") {
                    setSearchError(true)
                }
            }

        } catch (e) {
            console.log(e)
            toast({
                title: "Could not connect to IMDB",
                status: "error",
                isClosable: true,
            })
        }


    }, [ImdbBaseURL, formValues.title])

    useEffect(() => {
        if (formValues.title.length > 3) {
            searchHandler()
        }
    }, [formValues, searchHandler])

    const nominateHandler = (movie: movieInterface) => {
        //Limit to five movies
        if (nominatedMovies.length === 5) {
            toast({
                title: "Too many nominations. Try removing a movie first.",
                status: "error",
                isClosable: true,
            })
            return
        }

        // Screen for duplicates
        if (nominatedMovies.find(item => item.imdbID === movie.imdbID)) {
            return;
        }

        setNominatedMovies([...nominatedMovies, movie])
    }

    const removeNominationHandler = (movieID: string) => {
        setNominatedMovies(nominatedMovies.filter(movie => movie.imdbID !== movieID))
    }

    return (
        <Box m={"5"}>
            <Box>
                <Text
                    as={"h1"}
                    m={"5"}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                >
                    2021 Shoppies
                </Text>
            </Box>

            <Container maxW="container.md" centerContent>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children={<SearchIcon/>}
                        />
                        <Input
                            focusBorderColor={"purple.500"}
                            name={"title"}
                            placeholder="Search for a film to nominate"
                            value={formValues.title}
                            typeof={"text"}
                            onInput={(event: React.ChangeEvent<HTMLInputElement>) => inputHandler(event)}
                            isInvalid={searchError}
                        />
                    </InputGroup>
                    {/*<Button colorScheme="pink" variant="outline">*/}
                    {/*    Search*/}
                    {/*</Button>*/}
            </Container>
            <Container maxW="container.lg" centerContent>
                <SearchResults movieList={movieList} nominateHandler={nominateHandler} nominations={nominatedMovies}/>
            </Container>
            <Container maxW="container.xl" centerContent>
                <Box display={"flex"} justifyContent={"center"}>
                <Nominations nominatedMovies={nominatedMovies} removeNominationHandler={removeNominationHandler}/>
                </Box>
            </Container>
        </Box>

    )
}


export default MovieSearch