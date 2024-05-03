import React, { useEffect, useState } from "react";
import philippinesMap from "./assets/philippine_empty_map.svg";

const provinces = [
  "abra",
  "agusan_del_norte",
  "agusan_del_sur",
  "aklan",
  "albay",
  "antique", //done
  "apayao",
  "aurora",
  "basilan",
  "bataan",
  "batanes",
  "batangas", //
  "benguet",
  "biliran",
  "bohol",
  "bukidnon",
  "bulacan",
  "cagayan",
  "camarines_norte",
  "camarines_sur",
  "camiguin",
  "capiz",
  "catanduanes",
  "cavite",
  "cebu",
  "cotabato",
  "davao_de_oro",
  "davao_del_norte",
  "davao_del_sur",
  "davao_occidental",
  "davao_oriental",
  "dinagat_islands",
  "eastern_samar",
  "guimaras",
  "ifugao",
  "ilocos_norte",
  "ilocos_sur",
  "iloilo",
  "isabela",
  "kalinga",
  "la_union",
  "laguna",
  "lanao_del_norte",
  "lanao_del_sur",
  "leyte",
  "maguindanao_del_norte",
  "maguindanao_del_sur",
  "marinduque",
  "masbate",
  "metro_manila",
  "misamis_occidental",
  "misamis_oriental",
  "mountain_province",
  "negros_occidental",
  "negros_oriental",
  "northern_samar",
  "nueva_ecija",
  "nueva_vizcaya",
  "occidental_mindoro",
  "oriental_mindoro",
  "palawan",
  "pampanga",
  "pangasinan",
  "quezon",
  "quirino",
  "rizal",
  "romblon",
  "samar",
  "sarangani",
  "siquijor",
  "sorsogon",
  "south_cotabato",
  "southern_leyte",
  "sultan_kudarat",
  "sulu",
  "surigao_del_norte",
  "surigao_del_sur",
  "tarlac",
  "tawi-tawi",
  "zambales",
  "zamboanga_del_norte",
  "zamboanga_del_sur",
  "zamboanga_sibugay",
];

const App = () => {
  const [provincePaths, setProvincePaths] = useState({});
  const [provinceStates, setProvinceStates] = useState({});

  useEffect(() => {
    const loadSVG = async (filePath) => {
      const response = await fetch(filePath);
      const svgText = await response.text();
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

      const paths = {};
      let province_match = 0;
      provinces.forEach((province) => {
        const path = svgDoc.getElementById(province);
        if (path) {
          paths[province] = path.getAttribute("d");
          console.log(province);
          province_match++;
        }
      });
      console.log("Provinces counted", province_match);

      setProvincePaths(paths);
      setProvinceStates(
        Object.fromEntries(
          provinces.map((province) => [
            province,
            { hovered: false, filled: false },
          ])
        )
      );
    };
    loadSVG(philippinesMap);
  }, []);

  const handleMouseEnter = (province) => {
    setProvinceStates((prevState) => ({
      ...prevState,
      [province]: { ...prevState[province], hovered: true },
    }));
  };

  const handleMouseLeave = (province) => {
    setProvinceStates((prevState) => ({
      ...prevState,
      [province]: { ...prevState[province], hovered: false },
    }));
  };

  const handleClick = (province) => {
	console.log(province);
    setProvinceStates((prevState) => ({
      ...prevState,
      [province]: {
        ...prevState[province],
        filled: !prevState[province].filled,
      },
    }));
  };

  return (
    <main>
      <h1>Philippines Map</h1>
      <div style={{ height: "100vh" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 1700"
          preserveAspectRatio="xMinYMin meet"
        >
          {Object.entries(provincePaths).map(([province, path]) => (
            <g key={province}>
              <path
                d={path}
                stroke="red"
                strokeWidth="2"
                fill={
                  provinceStates[province].filled
                    ? "red"
                    : provinceStates[province].hovered
                    ? "lightgray"
                    : "white"
                }
                onMouseEnter={() => handleMouseEnter(province)}
                onMouseLeave={() => handleMouseLeave(province)}
                onClick={() => handleClick(province)}
                style={{ cursor: "pointer" }}
              />
              <text x="10" y="10" fill="black">
                {province}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </main>
  );
};

export default App;
