import React, { useEffect, useState } from 'react';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="restaurant"](12.9716,77.5946,13.0350,77.6500);out;`
        );
        const data = await response.json();
        setRestaurants(data.elements || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={`https://picsum.photos/200/150?random=${restaurant.id}`}
            alt={restaurant.tags.name || "Unnamed Restaurant"}
            className="w-full h-32 object-cover rounded-t-lg mb-2"
          />
          <h3 className="text-lg font-semibold mb-2">
            {restaurant.tags.name || "Unnamed Restaurant"}
          </h3>
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> Lat: {restaurant.lat}, Lon: {restaurant.lon}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Rating:</strong> Not available
          </p>
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
