import React, { useEffect, useState } from "react";
import philippinesMap from "./assets/philippine_empty_map.svg";
import { ReactSVG } from "react-svg";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const svg = document.getElementById("philippines-map");
    const palawanPath = svg.querySelector("#palawan");
	console.log(palawanPath);

    const toggleColor = () => {
      setSelected((prevSelected) => !prevSelected);
    };

    palawanPath.addEventListener("click", toggleColor);

    return () => {
      palawanPath.removeEventListener("click", toggleColor);
    };
  }, []);
  return (
    <div>
      <h1>Philippines Map - Palawan</h1>
      <ReactSVG
        src={philippinesMap}
        onClick={handleToggleColor}
        beforeInjection={(svg) => {
          svg.classList.add("svg-class-name"); // Add a class to the SVG for styling
          svg.addEventListener("click", handleToggleColor); // Add click event listener to the SVG
          return svg;
        }}
        afterInjection={(error, svg) => {
          if (error) {
            console.error("Error injecting SVG:", error);
            return;
          }
          console.log("SVG injected:", svg);
        }}
        wrapper="span"
        className="wrapper-class-name"
        loading={() => <span>Loading...</span>}
        fallback={() => <span>Error!</span>}
      />
    </div>
  );
}

export default App;
