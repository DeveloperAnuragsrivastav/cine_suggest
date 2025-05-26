import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "d67a1cf25db809bd7b36d8b416c8a5b8";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(res.data);
    };

    const fetchVideo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const trailer = res.data.results.find((v) => v.type === "Trailer");
      if (trailer) setVideoKey(trailer.key);
    };

    const fetchCast = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCast(res.data.cast.slice(0, 5)); // 5 is here number of  cast shown
    };

    fetchDetails();
    fetchVideo();
    fetchCast();
  }, [id]);

  if (!movie) return <p className="text-center mt-20">Loading movie details...</p>;

  return (

    <div className="min-h-screen bg-pink-100 p-5 sm:p-10">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
    
    {/* Title + Back Button Container */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
      <h1 className="text-3xl font-bold text-pink-700 text-center sm:text-left">{movie.title}</h1>
      
      <button
        onClick={() => navigate(-1)}
        className="mt-2 sm:mt-0 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg"
      >
        ⬅ Back
      </button>
    </div>

    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg w-full md:w-64 mx-auto md:mx-0"
      />

      <div className="flex-1">
        <p className="mb-4 text-gray-700 leading-relaxed">{movie.overview}</p>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
        </p>

        <p className="text-sm text-gray-600 mb-4">
          <strong>Release Date:</strong> {movie.release_date}
        </p>

        {/* Cast */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-2">Cast:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {cast.map((actor) => (
              <li key={actor.id}>
                {actor.name} as <span className="text-gray-500">{actor.character}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Trailer */}
    {videoKey && (
      <div className="aspect-video mt-6">
        <iframe
          title="trailer"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          allowFullScreen
          className="rounded-md"
        />
      </div>
    )}
  </div>
</div>


  );
};

export default MovieDetail;
