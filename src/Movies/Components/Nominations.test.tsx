import React from "react";
import {render, screen} from "@testing-library/react";
import Nominations from "./Nominations";
import {movieInterface} from "../../Interfaces/MovieInterfaces";
import {ChakraProvider} from "@chakra-ui/react";

test("nominations component", () => {
    let nominatedMovies = [
        {
            Title: "The Mitchells vs. the Machines",
            Year: "2021",
            imdbID: "tt7979580",
            Type: "movie",
            Poster:
                "https://m.media-amazon.com/images/M/MV5BMjdkZjNjNDItYzc4MC00NTkxLTk1MWEtY2UyZjY5MjUwNDNkXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_SX300.jpg",
        },
    ];

    const removeNominationHandler = (id: string) => {
        nominatedMovies = nominatedMovies.filter(
            (movie: movieInterface) => movie.imdbID !== id
        );
    };

    render(
        <ChakraProvider>
            <Nominations
                nominatedMovies={nominatedMovies}
                removeNominationHandler={removeNominationHandler}
            ></Nominations>
        </ChakraProvider>
    );
    const removeButtonElement = screen.getByRole("button", {name: /Remove/i});
    const titleElement = screen.getByRole("heading", {
        name: /The Mitchells vs. the Machine/i,
    });
    expect(removeButtonElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
});