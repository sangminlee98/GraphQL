import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../types";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client # local only field
    }
  }
`;

interface MovieData {
  movie: IMovie;
}
interface MovieVars {
  movieId: string;
}

function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery<MovieData, MovieVars>(GET_MOVIE, {
    variables: {
      movieId: id!,
    },
  });
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data?.movie.isLiked,
      },
    });
  };
  if (loading) return <h1>Fetching movie...</h1>;
  return (
    <div>
      <h1>{data?.movie.title}</h1>
      <h3>{data?.movie.rating}</h3>
      <button onClick={onClick}>
        {data?.movie.isLiked ? "Unlike" : "Like"}
      </button>
      <img
        style={{ display: "block" }}
        src={data?.movie.medium_cover_image}
        alt=""
      />
    </div>
  );
}

export default Movie;
