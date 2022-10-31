import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { Movie, Tweet } from "../types";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

function Movies() {
  const { loading, data, error } = useQuery(ALL_MOVIES);
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const client = useApolloClient();
  // useEffect(() => {
  //   client
  //     .query({
  //       query: gql`
  //         {
  //           allMovies {
  //             title
  //             id
  //           }
  //         }
  //       `,
  //     })
  //     .then((res) => setMovies(res.data.allMovies));
  // }, [client]);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Could not fetch</h1>;
  return (
    <>
      <h1>Movies</h1>
      <ul>
        {data.allMovies.map((movie: Movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <h1>Tweets</h1>
      <ul>
        {data.allTweets.map((tweet: Tweet) => (
          <li key={tweet.id}>
            {tweet.text}/by: {tweet.author?.fullName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Movies;
