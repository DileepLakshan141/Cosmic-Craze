import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import SpaceWeatherAlerts from "../pages/space-weather-alerts-page/SpaceWeatherAlerts";

// Mock the axios module to prevent actual HTTP requests
const MY_API_KEY = process.env.REACT_APP_NASA_API_KEY;

jest.mock("axios", () => ({
  get: jest.fn((url) => {
    if (url.includes("/DONKI/notifications")) {
      return Promise.resolve({
        data: [
          {
            messageType: "cme",
            messageID: "1",
            messageIssueTime: new Date(),
            messageURL: "https://nasa.donki.alerts/alert_one",
          },
          {
            messageType: "flr",
            messageID: "2",
            messageIssueTime: new Date(),
            messageURL: "https://nasa.donki.alerts/alert_two",
          },
          {
            messageType: "sep",
            messageID: "3",
            messageIssueTime: new Date(),
            messageURL: "https://nasa.donki.alerts/alert_three",
          },
        ],
      });
    }
    return Promise.resolve({ data: {} });
  }),
}));

describe("SpaceWeatherAlerts component", () => {
  test("Component renders without errors", async () => {
    const { findByText } = render(<SpaceWeatherAlerts />);
    const loadingElement = await findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("Fetches space weather alerts from API and displays them correctly", async () => {
    const mockData = {
      data: [
        {
          messageType: "CME",
          messageID: "1",
          messageIssueTime: new Date(),
          messageURL: "https://nasa.donki.alerts/alert_one",
        },
        {
          messageType: "FLR",
          messageID: "2",
          messageIssueTime: new Date(),
          messageURL: "https://nasa.donki.alerts/alert_two",
        },
        {
          messageType: "SEP",
          messageID: "3",
          messageIssueTime: new Date(),
          messageURL: "https://nasa.donki.alerts/alert_three",
        },
      ],
    };

    axios.get.mockResolvedValueOnce(mockData);

    const { getByText, queryByText } = render(<SpaceWeatherAlerts />);

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Check if specific alerts are rendered
    expect(getByText("Coronal Mass Ejection")).toBeInTheDocument();
    expect(getByText("Solar Flare")).toBeInTheDocument();
    expect(getByText("Solar Energetic Particle Event")).toBeInTheDocument();

    // Ensure filter buttons are rendered
    expect(getByText("SEP")).toBeInTheDocument();
    expect(getByText("CME")).toBeInTheDocument();
    expect(getByText("FLR")).toBeInTheDocument();

    // Verify that the axios.get method was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/DONKI/notifications?&type=all&api_key=${MY_API_KEY}`
    );
  });
});
