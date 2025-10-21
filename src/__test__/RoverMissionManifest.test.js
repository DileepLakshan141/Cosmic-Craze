import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import RoverMissions from "../pages/rover-mission-manifest/RoverMissions";

const MY_API_KEY = process.env.REACT_APP_NASA_API_KEY;
// Mock the axios module to prevent actual HTTP requests
jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/rovers/manifest")) {
      return Promise.resolve({
        data: {
          rovers: [],
        },
      });
    }
    return Promise.resolve({ data: {} });
  }),
}));

describe("RoverMissions component", () => {
  test("Component renders without errors", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        rovers: [],
      },
    });

    const { findByText } = render(<RoverMissions />);
    const loadingElement = await findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("Fetches rover mission data from API and displays it correctly", async () => {
    const mockData = {
      data: {
        rovers: [
          {
            id: 1,
            name: "Rover1",
            status: "Active",
            cameras: ["FHAZ", "RHAZ"],
            landing_date: new Date(),
            launch_date: new Date(),
            max_sol: 4500,
            total_photos: 23900,
          },
          {
            id: 2,
            name: "Rover2",
            status: "Complete",
            cameras: ["FHAZ", "RHAZ", "MAHDI"],
            landing_date: new Date(),
            launch_date: new Date(),
            max_sol: 2300,
            total_photos: 14500,
          },
        ],
      },
    };

    axios.get.mockResolvedValueOnce(mockData);

    const { getByText, queryByText } = render(<RoverMissions />);

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    expect(getByText(/"Rover1"/)).toBeInTheDocument();
    expect(getByText(/"Rover2"/)).toBeInTheDocument();
    expect(getByText("Active")).toBeInTheDocument();
    expect(getByText("Complete")).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${MY_API_KEY}`
    );
  });
});
