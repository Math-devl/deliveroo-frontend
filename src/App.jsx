import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// imports img
import headerImage from "./assets/images/header-image.jpg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      {" "}
      <header>
        <h2>{data.restaurant.name}</h2>
        <p>{data.restaurant.description}</p>
        <img src={headerImage} alt="header-image" />
      </header>
      <main>
        <div>
          {/* 1er .map qui retourne le titre de la catégorie */}
          <h2></h2>
          {/* 2eme .map qui retourne chaque "meal" et ses infos en fonction de la catégorie */}
          <div>
            <h3></h3>
            <p></p>
            <p></p>
            <img src="" alt="" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
