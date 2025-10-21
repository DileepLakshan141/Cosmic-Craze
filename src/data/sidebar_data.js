import { FaEarthAmericas } from "react-icons/fa6";
import { SiPlanetscale } from "react-icons/si";
import { IoLibrarySharp } from "react-icons/io5";
import { GiExplodingPlanet } from "react-icons/gi";
import { GiPlanetCore } from "react-icons/gi";

const sidebarData = [
  {
    text: "Astronomic Pic Of Day",
    icon: <FaEarthAmericas />,
    link: "/dashboard/apod",
  },
  {
    text: "Space Weather Alerts",
    icon: <SiPlanetscale />,
    link: "/dashboard/space-weather-alerts",
  },
  {
    text: "Mars Rover Photos",
    icon: <GiPlanetCore />,
    link: "/dashboard/mars-rover-photos",
  },
  {
    text: "Rover Mission Manifest",
    icon: <GiExplodingPlanet />,
    link: "/dashboard/rover-missions",
  },
  {
    text: "NASA Image Library",
    icon: <IoLibrarySharp />,
    link: "/dashboard/nasa-image-library",
  },
];

export default sidebarData;
