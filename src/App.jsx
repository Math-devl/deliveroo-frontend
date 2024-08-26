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
    //console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header>
        <h2>{data.restaurant.name}</h2>
        <p>{data.restaurant.description}</p>
        <img src={headerImage} alt="header-image" />
      </header>
      <main>
        {/* Parcourir chaque catégorie */}
        {data.categories.map((category, index) => {
          // console.log(elem);
          return (
            <div key={index}>
              <h2>{category.name}</h2>
              {category.meals.map((meal, id) => {
                // console.log(meal);
                return (
                  <div key={id}>
                    <h3>{meal.title}</h3>
                    <p>{meal.description}</p>
                    <p>{meal.price} €</p>
                    {meal.picture && (
                      <img src={meal.picture} alt={meal.title} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </>
  );
}

export default App;
