import Title from "./Title";
import MealDescription from "./MealDescription";

const MealCard = ({ data }) => {
  {
    data.categories.map((category, index) => {
      // console.log(category); // {name: 'Brunchs', meals: Array(2)}
      return (
        <div key={index}>
          <Title title={category.name} />

          {/* <h2>{category.name}</h2> */}
          {category.meals.map((meal, id) => {
            // console.log(meal);
            return (
              <div key={id}>
                <MealDescription meal={meal} />
                {/*                 <h3>{meal.title}</h3>
                <p>{meal.description}</p>
                <p>{meal.price} €</p>
                {meal.picture && <img src={meal.picture} alt={meal.title} />} */}
              </div>
            );
          })}
        </div>
      );
    });
  }
};

export default MealCard;
