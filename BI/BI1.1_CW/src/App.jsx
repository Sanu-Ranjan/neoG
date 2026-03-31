import useFetch from "./useFetch";

const BookList = ({ books }) => {
  return (
    <>
      <ul>
        {books?.map(({ title }) => (
          <li>
            <p>{title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
const BookSelect = ({ title }) => {
  const bookApi = import.meta.env.VITE_BOOK_API;
  const uriComponent = encodeURIComponent(title);
  const { data, error, loading } = useFetch(`${bookApi}/books/${uriComponent}`);

  if (!loading) {
    if (data) {
      console.log(data);
    }
  }

  return (
    <>
      <h2>{title}</h2>
      {loading ? (
        <p>Loading</p>
      ) : data?.success ? (
        <>
          <p>Author: {data.data.data.author}</p>
          <p>Published Year: {data.data.data.publishedYear}</p>
          <p>Genre: {data.data.data.genre.join(", ")}</p>
          <p>language: {data.data.data.language}</p>
          <p>Country: {data.data.data.country}</p>
          <p>Rating: {data.data.data.rating}</p>
          <p>Summary: {data.data.data.summary}</p>
        </>
      ) : (
        <p>Book Not Found</p>
      )}
    </>
  );
};

function App() {
  const bookApi = import.meta.env.VITE_BOOK_API;
  const { data, error, loading } = useFetch(`${bookApi}/books`);

  if (!loading) console.log(data);

  return (
    <>
      <h1>Books</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        data && <BookList books={data?.data?.books} />
      )}
      <BookSelect title={"The Da Vinci Code"} />
    </>
  );
}

export default App;
