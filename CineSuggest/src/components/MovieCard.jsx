import React from 'react';
import { Link } from "react-router-dom";

const MovieCard = ({ movie, genreMap }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="hover:scale-105 transition w-full"
    >
      <div className="bg-white rounded-xl shadow-lg p-4 w-full h-full flex flex-col justify-between">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full h-72 object-cover"
        />

        <div className="mt-2 flex flex-col justify-between flex-grow">
          <h2 className="font-bold text-lg truncate">{movie.title}</h2>

          <p className="text-sm text-gray-500 truncate">
            {movie.genre_ids?.map((id) => genreMap[id]).join(", ")}
          </p>

          <p className="text-yellow-500 font-bold mt-1">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
