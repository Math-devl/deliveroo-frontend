const MealDescription = (meal) => {
  //console.log(meal);
  return (
    <div key={id}>
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>{meal.price} €</p>
      {meal.picture && <img src={meal.picture} alt={meal.title} />}
    </div>
  );
};

export default MealDescription;
