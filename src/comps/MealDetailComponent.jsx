const MealDetailComponent = ({meal}) => {
    if (!meal) return null; //om ingen maträtt är vald, visa ingen

    return (
        <div className="card bg-base-100 shadow-md p-4 rounded-lg">

            <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-full h-auto rounded-lg"
            />
            <h2 className="text-xl font-bold mt-2">
                {meal.strMeal}
            </h2>
            <p className="mt-2">
                <strong>Kategori:</strong> {meal.strCategory}
            </p>
            <p>
                <strong>Kök:</strong> {meal.strArea}
            </p>
            <h3 className="text-lg font-bold mt-4">
                Instruktioner
            </h3>
            <p className="text-sm">
                {meal.strInstructions}
            </p>
        </div>
    );
};

export default MealDetailComponent;