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
          <p>
            {" "}
            <strong>Author:</strong> {data.data.data.author}
          </p>
          <p>
            <strong>Published Year:</strong> {data.data.data.publishedYear}
          </p>
          <p>
            <strong>Genre:</strong> {data.data.data.genre.join(", ")}
          </p>
        </>
      ) : (
        <p>Book Not Found</p>
      )}
    </>
  );
};

const BooksByAuthor = ({ author }) => {
  const uriPart = encodeURIComponent(author);
  const bookApi = import.meta.env.VITE_BOOK_API;
  const { data, error, loading } = useFetch(
    `${bookApi}/books/author/${uriPart}`,
  );

  return (
    <>
      <h2>Books by {author}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {!error ? (
            data?.success ? (
              <>
                <BookList books={data.data.data} />
              </>
            ) : (
              <p>No books found</p>
            )
          ) : (
            <p>Error Loading data</p>
          )}
        </div>
      )}
    </>
  );
};

function App() {
  const bookApi = import.meta.env.VITE_BOOK_API;
  const { data, error, loading } = useFetch(`${bookApi}/books`);

  return (
    <>
      <h1>Books</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        data && <BookList books={data?.data?.books} />
      )}
      <BookSelect title={"Shoe Dog"} />
      <BooksByAuthor author={"Harper Lee"} />
    </>
  );
}

export default App;
