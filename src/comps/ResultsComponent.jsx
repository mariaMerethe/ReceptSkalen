const ResultsComponent = ({recipes}) => {
    return (
        <div>
            <h2 className="text-xl font-bold mt-4">Sökresultat</h2>
            {recipes.length === 0 ? (
                <p>Inga resultat än...</p>
            ) : (
                <ul>
                    {recipes.map((meal) => (
                        <li key={meal.idMeal}>{meal.strMeal}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResultsComponent;