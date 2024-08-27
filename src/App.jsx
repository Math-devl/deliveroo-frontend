import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// import components
//import MealCard from "../components/MealCard";

// imports img
import headerImage from "./assets/images/header-image.jpg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({});

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
        <div className="container">
          <div>
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>

          <img src={headerImage} alt="header-image" />
        </div>
      </header>

      <main>
        <div className="container">
          <div className="column-left">
            {data.categories.map((category) => {
              //console.log(category);
              if (category.meals.length !== 0) {
                return (
                  <section key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {category.meals.map((meal, id) => {
                        // console.log(meal);
                        return (
                          <article
                            key={id}
                            onClick={() => {
                              console.log(meal); // afficche l'objet "meal" sur lequel on click
                            }}
                          >
                            <div>
                              <h3>{meal.title}</h3>
                              <p className="description">{meal.description}</p>
                              <p className="price">{meal.price} €</p>
                              {meal.populare && (
                                <p className="popular-price">populaire</p>
                              )}
                            </div>

                            {meal.picture && (
                              <img src={meal.picture} alt={meal.title} />
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              }
            })}
          </div>
          <div className="column-right">
            <button>Valider mon panier</button>
            <div>
              <p>Nom du plat</p>
              <p>prix</p>
            </div>
            <div>
              <p>Sous totla</p>
              <p></p>
            </div>
            <div>
              <p>Frais de livraison</p>
              <p></p>
            </div>
            <div>
              <p>Total</p>
              <p></p>
            </div>
          </div>
        </div>
        {/*       <MealCard data={data} /> */}
        {/* Parcourir chaque catégorie */}
      </main>
    </>
  );
}

export default App;
