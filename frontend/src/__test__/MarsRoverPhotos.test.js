import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MarsRoverPhotos from "../pages/mars-rover-photos/MarsRoverPhotos";

jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/nasa/mars/rover-photos")) {
      return Promise.resolve({
        data: {},
      });
    }
    return Promise.resolve({ data: {} });
  }),
}));

test("Renders camera buttons based on selected rover", () => {
  const { getByText } = render(<MarsRoverPhotos />);

  // By default, the component renders with the first rover (curiosity)
  const curiosityButton = getByText("curiosity");
  fireEvent.click(curiosityButton);

  // Ensure that camera buttons corresponding to curiosity are rendered
  expect(getByText("fhaz")).toBeInTheDocument();
  expect(getByText("rhaz")).toBeInTheDocument();
  expect(getByText("mast")).toBeInTheDocument();
  expect(getByText("chemcam")).toBeInTheDocument();
  expect(getByText("mahli")).toBeInTheDocument();
  expect(getByText("mardi")).toBeInTheDocument();
  expect(getByText("navcam")).toBeInTheDocument();
});
