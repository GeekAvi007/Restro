import React, { useState, useEffect } from "react";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );
        const data = await response.json();
        setDishes(data.meals || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching Request:", error);
        setLoading(false);
      }
    };
    fetchDishes();
  },[]);

  if(loading){
    return <div className="text-center py-4">Loading...</div>;
  }
    return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {dishes.map((dish)=>
      <div key={dish.idMeal}
      className="bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <img
      src={dish.strMealThumb}
      alt={dish.strMeal}
      className="w-full h-32 object-cover rounded-t-lg mb-2"/>
      <h3 className="text-lg font-semibold mb-2">{dish.strMeal}</h3>
      <p className="text-sm text-gray-600">
        <strong>Category:</strong> Seafood
      </p>
      <a
      href={`https://www.themealdb.com/meal/${dish.idMeal}`}
      target="_blank"
      rel="nooperner noreferrer"
      className="text-blue-500 hover:underline text-sm">
        View Recipie
      </a>
      </div>
      )}
    </div>
    );
};
export default Dishes;
