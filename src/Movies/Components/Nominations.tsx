import React, {useCallback, useEffect} from "react";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import {Box, Image, Badge, Button, Divider, Text} from "@chakra-ui/react"
import axios from "axios";

interface Props {
    nominatedMovies: movieInterface[],
    removeNominationHandler: Function
}

const Nominations: React.FC<Props> = (props: Props) => {

    const baseURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDBKEY}&i=`

    const getMovieDetails = async (movieID: string) => {
        try {
            let response = await axios.get(baseURL + movieID)
            console.log(response)
            if(response.data){
                const details = response.data
            }
        } catch (e) {
            console.log(e)
        }
    }

    if(props.nominatedMovies.length === 0) return (
        <Box>
            <Text
                as={"h2"}
                m={"3"}
                bgGradient="linear(to-l, #FF0080, #7928CA)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Nominate a movie to get started
            </Text>
        </Box>
    )

    return (
        <Box>
            <Divider mt={"5"} />
            <Text
                as={"h2"}
                m={"3"}
                bgGradient="linear(to-l, #FF0080, #7928CA)"
                bgClip="text"
                fontSize="xl"
                fontWeight="extrabold"
            >
                Nominations
            </Text>
            {/*<Button onClick={() => getMovieDetails(props.nominatedMovies[0].imdbID)}*/}
            {/*        colorScheme="purple"*/}
            {/*        variant="outline"*/}
            {/*>*/}
            {/*    Submit Nominations*/}
            {/*</Button>*/}
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
                {props.nominatedMovies.map(movie => (
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" display={"flex"} m={"2"}
                         flexDirection={"column"}>
                        <Image src={movie.Poster}
                               alt={movie.Title}
                               objectFit="cover"
                               boxSize="300px"
                        />

                        <Box p="3">
                            <Box d="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                    {movie.Year}
                                </Badge>
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                >
                                    "Movie cast?"
                                </Box>
                            </Box>

                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {movie.Title}
                            </Box>

                            <Box>
                                "Movie Descirption?"
                            </Box>

                            <Box d="flex" mt="2" alignItems="center">
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                    Insert Rotten Tomatoes Score Here
                                </Box>
                            </Box>
                            <Button mt={"2"} onClick={() => props.removeNominationHandler(movie.imdbID)}>Remove</Button>
                        </Box>
                    </Box>
                    // <div key={movie.imdbID}>
                    //     <h1>{movie.Title}</h1>
                    //     <p>{movie.Year}</p>
                    //     <button onClick={() => props.removeNominationHandler(movie.imdbID)}>Remove</button>
                    // </div>
                ))
                }

            </Box>
        </Box>
    )
}

export default Nominations