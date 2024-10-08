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
  const [orders, setOrders] = useState([]);

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
                              // console.log(meal.title); // affiche le title du "meal" sur lequel on click
                              setOrders([
                                ...orders,
                                {
                                  title: meal.title,
                                  price: meal.price,
                                  id: meal.id,
                                },
                              ]);
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
            {orders.map((order) => {
              //console.log(order); renvoie l'objet sur lequel on clique
              return (
                <div key={order.id}>
                  <div className="order">
                    <p>{order.title}</p>
                    <p>{order.price}</p>
                  </div>
                </div>
              );
            })}
            <div className="subTotal">
              <p>Sous total</p>
              <p>
                {orders.reduce((accumulator, order) => {
                  //console.log(typeof order.price); string
                  const subTotal = accumulator + Number(order.price);
                  return subTotal;
                }, 0)}
                €
              </p>
            </div>
            <div className="fees">
              <p>Frais de livraison</p>
              <p>2,5 €</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>
                {orders.reduce((accumulator, order) => {
                  //console.log(typeof order.price); string
                  const subTotal = accumulator + Number(order.price) + 2.5;
                  return subTotal;
                }, 0)}
                €
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
