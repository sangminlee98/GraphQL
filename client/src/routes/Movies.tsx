import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { Movie } from "../types";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      })
      .then((res) => setMovies(res.data.allMovies));
  }, [client]);
  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

export default Movies;
