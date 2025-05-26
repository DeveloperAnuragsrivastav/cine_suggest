import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_KEY = "d67a1cf25db809bd7b36d8b416c8a5b8";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Home");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchGenres = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    setGenres(res.data.genres);
    const map = {};
    res.data.genres.forEach((g) => (map[g.id] = g.name));
    setGenreMap(map);
  };

  const fetchMovies = async () => {
    setLoading(true);
    let url = "";
    if (searchTerm) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=${page}`;
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=en-US&page=${page}`;
    } else {
      switch (selectedTab) {
        case "Trending":
          url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`;
          break;
        case "Popular":
        case "Home":
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
          break;
        case "Upcoming":
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`;
          break;
        default:
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      }
    }
    const res = await axios.get(url);
    setMovies(res.data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, searchTerm, selectedTab, page]);

  const handlePageChange = (direction) => {
    if (direction === "prev" && page > 1) setPage(page - 1);
    else if (direction === "next") setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-pink-100 overflow-x-hidden">
      <Navbar
        selectedTab={selectedTab}
        onTabChange={(tab) => {
          setSelectedTab(tab);
          setSearchTerm("");
          setSelectedGenre("");
          setPage(1);
        }}
      />

      <div className="py-10 px-5 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-10">
          <select
            className="p-2 rounded-lg border-2 border-pink-400 bg-white text-pink-800 w-full sm:w-48"
            onChange={(e) => {
              setSearchTerm("");
              setSelectedGenre(e.target.value);
              setPage(1);
            }}
            value={selectedGenre}
          >
            <option value="">🎞️ Movie Genre</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="🔍 Search Movie Name"
            className="p-2 rounded-lg border-2 border-pink-400 w-full sm:w-72"
            value={searchTerm}
            onChange={(e) => {
              setSelectedGenre("");
              setSelectedTab("");
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6 px-4">
          {loading ? (
            <p className="text-pink-700 text-center col-span-full">
              Loading movies...
            </p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
            ))
          ) : (
            <p className="text-pink-700 text-center col-span-full">
              No movies found.
            </p>
          )}
        </div>

        {/* Pagination: Show only when not loading and movies exist */}
        {!loading && movies.length > 0 && (
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={page === 1}
              className="bg-pink-400 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              ⬅️ Prev
            </button>
            <span className="text-pink-800 font-bold text-xl">Page {page}</span>
            <button
              onClick={() => handlePageChange("next")}
              className="bg-pink-400 text-white px-4 py-2 rounded-lg"
            >
              Next ➡️
            </button>
          </div>
        )}
      </div>

      
{/* footer starts here  */}
      <>
      <Footer/>
      </>
    </div>

    
  );
};

export default Home;
