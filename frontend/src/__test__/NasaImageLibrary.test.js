import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import NasaImageLibrary from "../pages/nasa-image-library/NasaImageLibrary";

// Mock the axios module to prevent actual HTTP requests
jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/nasa/library")) {
      return Promise.resolve({
        data: {
          collection: { items: [] },
        },
      });
    }
    return Promise.resolve({ data: {} });
  }),
}));

describe("NasaImageLibrary component", () => {
  test("Fetches and displays search results correctly", async () => {
    const mockSearchResults = [
      {
        data: [{ media_type: "image", nasa_id: "1", date_created: new Date() }],
        links: [{ href: "dummy.url", rel: "preview", render: "image" }],
      },
      {
        data: [{ media_type: "image", nasa_id: "2", date_created: new Date() }],
        links: [{ href: "dummy.url", rel: "preview", render: "image" }],
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { collection: { items: mockSearchResults } },
    });

    const { getByPlaceholderText, getByTestId, findByAltText, queryByText } =
      render(<NasaImageLibrary />);

    // Mock user input and trigger search
    const searchInput = getByPlaceholderText("Enter the search prompt");
    fireEvent.change(searchInput, { target: { value: "moon" } });

    const searchButton = getByTestId("search-button");
    fireEvent.click(searchButton);

    // Wait for remove loading screen
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    findByAltText("1");
    findByAltText("2");
  });

  test("Displays 'No Images Found!' when no search results are returned", async () => {
    axios.get.mockResolvedValueOnce({
      data: { collection: { items: [] } },
    });

    const { getByPlaceholderText, getByTestId, findByText } = render(
      <NasaImageLibrary />
    );

    // Mock user input and trigger search
    const searchInput = getByPlaceholderText("Enter the search prompt");
    fireEvent.change(searchInput, { target: { value: "invalidsearchquery" } });

    const searchButton = getByTestId("search-button");
    fireEvent.click(searchButton);

    // Wait for 'No Images Found!' text to be rendered
    const noResultsText = await findByText("No Images Found!");
    expect(noResultsText).toBeInTheDocument();
  });
});
