import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import APOD from "../pages/apod-page/APOD";

const MY_API_KEY = process.env.REACT_APP_NASA_API_KEY;
// Mock the axios module to prevent actual HTTP requests
jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/dashboard/apod")) {
      return Promise.resolve({
        data: {
          url: "https://nasa.mock.sample.com/image.jpg",
          title: "Astronomic Picture of the Day",
          date: "2024-04-30",
          explanation: "This is a sample explanation.",
        },
      });
    }
    return Promise.resolve({ data: {} });
  }),
}));

// test suite
describe("APOD component", () => {
  // first test case to see that component renders without error
  test("Component renders without any errors", async () => {
    const { findByText } = render(<APOD />);
    const loadingElement = await findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  //   second test case to check api get the apod corrrectly
  test("fetches APOD data from API and displays it correctly", async () => {
    // Mock response data
    const mockData = {
      data: {
        title: "Test APOD",
        date: "2024-04-25",
        explanation: "This is a test APOD",
        url: "https://nasa.mock.sample.com/test.jpg",
      },
    };

    // Mock the axios.get method to return mockData
    axios.get.mockResolvedValueOnce(mockData);

    // Render the component
    const { getByText } = render(<APOD />);
    await waitFor(() => {
      // if loading text is displaying throw
      expect(() => getByText("Loading...")).toThrow();

      // Verify that the APOD data is displayed correctly
      expect(getByText("Test APOD")).toBeInTheDocument();
      expect(getByText("25 April, 2024")).toBeInTheDocument();
      expect(getByText("This is a test APOD")).toBeInTheDocument();
      expect(getByText("astronomic picture of the day")).toBeInTheDocument();
    });

    // Verify that the axios.get method was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/apod?api_key=${MY_API_KEY}`
    );
  });

  // to ensure api error handling
  test("handles API error gracefully", async () => {
    // Mock an error response
    const errorMessage = "API Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { getByText } = render(<APOD />);
    await waitFor(() => {
      expect(() => getByText("Loading..."));
    });
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/apod?api_key=${MY_API_KEY}`
    );
  });
});
