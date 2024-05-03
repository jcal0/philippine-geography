import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import philippinesMap from "./assets/philippine_empty_map.svg";

const App = () => {
  const [palawanPath, setPalawanPath] = useState(null);
  const [tarlacPath, setTarlacPath] = useState(null);
  const [zambalesPath, setZambalesPath] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const loadSVG = async (filePath) => {
      const response = await fetch(filePath);
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
      let path = svgDoc.getElementById("palawan");
      if (path) {
        setPalawanPath(path.getAttribute("d"));
      }
      path = svgDoc.getElementById("tarlac");
      if (path) {
        setTarlacPath(path.getAttribute("d"));
      }
      path = svgDoc.getElementById("zambales");
      if (path) {
        setZambalesPath(path.getAttribute("d"));
      }
    };
    loadSVG(philippinesMap);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <main>
      <div style={{ width: "100vh", height: "100vh" }}>
        <h1>Philippines Map</h1>

        <svg width="100vh" height="100vh">

          <path
            d={palawanPath}
            stroke="red"
            strokeWidth="2"
            fill={isFilled ? "red" : isHovered ? "lightgray" : "white"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
			style={{ cursor: "pointer" }}
          />
          <path
            d={tarlacPath}
            stroke="red"
            strokeWidth="2"
            fill={isFilled ? "red" : isHovered ? "lightgray" : "white"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
			style={{ cursor: "pointer" }}
          />
          <path
            d={zambalesPath}
            stroke="red"
            strokeWidth="2"
            fill={isFilled ? "red" : isHovered ? "lightgray" : "white"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
			style={{ cursor: "pointer" }}
          />

        </svg>
      </div>
    </main>
  );
};

export default App;
