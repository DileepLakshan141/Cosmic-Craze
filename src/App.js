import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in-page/SignIn";
import Signup from "./pages/sign-up-page/SignUp";
import HomePage from "./pages/home-page/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./pages/route-guard/ProtectedRoute";
import APOD from "./pages/apod-page/APOD";
import SpaceWeatherAlerts from "./pages/space-weather-alerts-page/SpaceWeatherAlerts";
import MarsRoverPhotos from "./pages/mars-rover-photos/MarsRoverPhotos";
import RoverMissions from "./pages/rover-mission-manifest/RoverMissions";
import NasaImageLibrary from "./pages/nasa-image-library/NasaImageLibrary";
import NotFound from "./pages/404-page/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app-container">
      <Toaster />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/" element={<APOD />} />
            <Route path="/dashboard/apod" element={<APOD />} />
            <Route
              path="/dashboard/space-weather-alerts"
              element={<SpaceWeatherAlerts />}
            />
            <Route
              path="/dashboard/mars-rover-photos"
              element={<MarsRoverPhotos />}
            />
            <Route
              path="/dashboard/rover-missions"
              element={<RoverMissions />}
            />
            <Route
              path="/dashboard/nasa-image-library"
              element={<NasaImageLibrary />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
