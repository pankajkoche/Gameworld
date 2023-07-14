import React from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
const games = [
  {
    id: 1,
    title: 'Game 1',
    url:'/tic-tac-toe',
    imageUrl: 'https://play-lh.googleusercontent.com/zPxLgj5nvl20ahJV7aFC6S5mD8kii5CEEDj25j1P9CYAfXL9sdDuO-8eES0r4DhJHrU',
    description: 'Description of Game 1',
  },
  {
    id: 2,
    title: 'Game 2',
    url:'/snake',
    imageUrl: 'https://www.coolmathgames.com/sites/default/files/Snake%20OG%20Image.png',
    description: 'Description of Game 2',
  },
  // Add more game objects as needed
];

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">Multi-Game Home Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
            ><Link to={game.url}>
                <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-gray-700">{game.description}</p>
            </Link>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
