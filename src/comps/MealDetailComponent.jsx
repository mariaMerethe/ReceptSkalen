const MealDetailComponent = ({meal}) => {
    if (!meal) return null; //om ingen maträtt är vald, visa ingen

    return (
        <div className="mt-6 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold">
                {meal.strMeal}
            </h2>
            <img 
                src={meal.strMealThumb} 
                alt={meal.strMeal} 
                className="w-64 rounded mt-2"
            />
            <p className="mt-2">
                <strong>Kategori:</strong> {meal.strCategory}
            </p>
            <p>
                <strong>Kök:</strong> {meal.strArea}
            </p>
            <h3 className="text-xl font-bold mt-4">
                Instruktioner
            </h3>
            <p className="text-sm">
                {meal.strInstructions}
            </p>
        </div>
    );
};

export default MealDetailComponent;