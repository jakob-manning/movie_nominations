import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios from "axios";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import SearchResults from "../Components/SearchResults";
import Nominations from "../Components/Nominations";
import {
    Text,
    Box,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Container,
    useToast,
} from "@chakra-ui/react";
import {SearchIcon, CloseIcon} from "@chakra-ui/icons";
import useStickyState from "../../Hooks/useStickyState";

const MovieSearch: React.FC = () => {
    const [movieList, setMovieList] = useState<movieInterface[]>([]);
    const [formValues, setFormValues] = useState({title: ""});
    const [searchError, setSearchError] = useState<boolean>(false);
    const [nominatedMovies, setNominatedMovies] = useStickyState(
        "nominatedFilms",
        []
    );
    const toast = useToast();
    const ImdbBaseURL = `${process.env.REACT_APP_APIPROXY}type=movie`;

    // Handle Form Input
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchError(false);
        // setMovieList([])
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setFormValues({...formValues, [name]: value});
    };

    // Clear Search Bar
    const clearInputHandler = () => {
        setSearchError(false);
        setFormValues({...formValues, title: ""});
    };

    // Send search request to OMDB
    const searchHandler = useCallback(
        async (event?: FormEvent) => {
            event?.preventDefault();
            setSearchError(false);

            try {
                const response: any = await axios.get(
                    ImdbBaseURL + "&s=" + formValues.title
                );
                if (response.data?.Search) {

                    // Remove Duplicate films
                    // IMDB sometimes returns multiple entries - Remove duplicates by checking ID
                    const movieIDs: string[] = [];
                    let uniqueMovies = response.data?.Search.filter(
                        (movie: movieInterface) => {
                            if (movieIDs.find((id) => id === movie.imdbID)) {
                                return false;
                            }
                            movieIDs.push(movie.imdbID);
                            return true;
                        }
                    );

                    setMovieList(uniqueMovies.slice(0, 4));
                }

                if (response.data?.Response === "False") {
                    if (response.data?.Error === "Movie not found!") {
                        setSearchError(true);
                    }
                }
            } catch (e) {
                console.log(e);
                toast({
                    title: "Could not connect to IMDB",
                    status: "error",
                    isClosable: true,
                });
            }
        },
        [ImdbBaseURL, formValues.title, toast]
    );

    // Trigger search if input is longer than three characters
    useEffect(() => {
        if (formValues.title.length > 3) {
            searchHandler();
        } else {
            setMovieList([]);
        }
    }, [formValues, searchHandler]);

    // Add movie to nominate list
    const nominateHandler = (movie: movieInterface) => {

        //Limit to five movies
        if (nominatedMovies.length === 5) {
            toast({
                title: "You can only nominate five movies. Try removing a movie first.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        // Screen for duplicates
        if (
            nominatedMovies.find(
                (item: movieInterface) => item.imdbID === movie.imdbID
            )
        ) {
            return;
        }

        // Display a banner at 5 nominations
        if (nominatedMovies.length === 4) {
            toast({
                title: "Five nominations selected. You can now submit your vote!",
                status: "info",
                isClosable: true,
            });
        }

        setNominatedMovies([...nominatedMovies, movie]);
    };

    // Remove a movie from the nomination list
    const removeNominationHandler = (movieID: string) => {
        setNominatedMovies(
            nominatedMovies.filter(
                (movie: movieInterface) => movie.imdbID !== movieID
            )
        );
    };

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
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                            inputHandler(event)
                        }
                        isInvalid={searchError}
                        aria-label="Search by title"
                    />
                    {formValues.title.length > 0 ? (
                        <InputRightElement
                            aria-label="Close search"
                            onClick={() => clearInputHandler()}
                        >
                            <CloseIcon color="gray.300"/>
                        </InputRightElement>
                    ) : null}
                </InputGroup>
            </Container>
            <Container maxW="container.lg" centerContent>
                <SearchResults
                    movieList={movieList}
                    nominateHandler={nominateHandler}
                    nominations={nominatedMovies}
                />
            </Container>
            <Container maxW="container.xl" centerContent>
                <Box display={"flex"} justifyContent={"center"}>
                    <Nominations
                        nominatedMovies={nominatedMovies}
                        removeNominationHandler={removeNominationHandler}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default MovieSearch;
