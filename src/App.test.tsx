import React from "react";
import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders the welcome page", () => {
    render(<App/>);
    // const titleElement = screen.getByText(/2021/i);
    const titleElement = screen.getByRole("heading", {name: /2021 Shoppies/i});
    const searchBarElement = screen.getByPlaceholderText(
        /Search for a film to nominate/i
    );
    const promptElement = screen.getByRole("heading", {
        name: /Nominate your five favourite movies!/i,
    });
    expect(titleElement).toBeInTheDocument();
    expect(searchBarElement).toBeInTheDocument();
    expect(promptElement).toBeInTheDocument();
});
