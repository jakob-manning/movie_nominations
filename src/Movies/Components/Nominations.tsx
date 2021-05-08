import React from "react";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import {Box, Image, Badge, Button, Divider, Text} from "@chakra-ui/react";

interface Props {
    nominatedMovies: movieInterface[];
    removeNominationHandler: Function;
}

const Nominations: React.FC<Props> = (props: Props) => {
    if (props.nominatedMovies.length === 0)
        return (
            <Box>
                <Text
                    as={"h2"}
                    m={"3"}
                    bgGradient="linear(to-l, #FF0080, #7928CA)"
                    bgClip="text"
                    fontSize="xl"
                    fontWeight="extrabold"
                >
                    Nominate your five favourite movies!
                </Text>
            </Box>
        );

    return (
        <Box>
            <Divider mt={"5"}/>
            <Text
                as={"h2"}
                m={"3"}
                bgGradient="linear(to-l, #FF0080, #7928CA)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
            >
                Nominations
            </Text>
            <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {props.nominatedMovies.map((movie) => (
                    <Box
                        maxW="xs"
                        m={"2"}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        display={"flex"}
                        flexDirection={"column"}
                        key={movie.imdbID}
                    >
                        <Image
                            src={movie.Poster}
                            alt={movie.Title}
                            objectFit="cover"
                            boxSize="400px"
                        />

                        <Box p="3">
                            <Box d="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                    {movie.Year}
                                </Badge>
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
                            <Button
                                mt={"2"}
                                onClick={() => props.removeNominationHandler(movie.imdbID)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Nominations;
