import React from "react";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import {Box, HStack, Heading, Text, Button, VStack, StackDivider, Image} from "@chakra-ui/react"

interface Props {
    movieList: movieInterface[],
    nominateHandler: Function,
    nominations: movieInterface[]
}

const MovieSearch: React.FC<Props> = (props: Props) => {

    const checkNominationStatus = (movieID: string) => {
        if(props.nominations.find(movie => movie.imdbID === movieID)) return true
        return false
    }

    return (
        <Box>
            {props.movieList.map(movie => (
                <Box p={"3"} m={"3"} borderWidth="1px" borderRadius="lg" key={movie.imdbID}>
                    <HStack spacing="24px">
                        <Image
                            objectFit="cover"
                            boxSize="150px"
                            src={movie.Poster}
                            alt={"Movie poster of " + movie.Title}
                            fallbackSrc={"https://via.placeholder.com/150x200?text=" + movie.Title}
                        />
                        <Box textAlign={"left"} p={"1"}>
                            <Heading as="h4" size="md">{movie.Title}</Heading>
                            <StackDivider/>
                            <Text>{movie.Year}</Text>
                            <Button onClick={() => props.nominateHandler(movie)}
                                    isDisabled ={checkNominationStatus(movie.imdbID)}
                            >
                                Nominate Movie
                            </Button>
                        </Box>
                    </HStack>
                </Box>
            ))}
        </Box>
    )
}

export default MovieSearch