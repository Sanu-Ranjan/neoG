import { useState } from "react";
import useFetch from "./useFetch";

const booksApi = import.meta.env.VITE_BOOKS_API;

const Loading = () => <p>Loading...</p>;

const Error = () => <p>Error Loading Books</p>;

const BookList = ({ books }) => {
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);

  if (!books) return <p>No book data</p>;

  const removeBook = async (_id) => {
    setView(true);
    try {
      const res = await fetch(`${booksApi}/books/id/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!json.success) {
        return setMessage("Book not Found");
      }

      setMessage("Book deleted Successfully");
    } catch (error) {
      setMessage("Error deleting books", error);
    }
    setTimeout(() => {
      setView(false);
      window.location.reload();
    }, 5000);
  };

  return (
    <>
      <ul>
        {books.map(({ title, _id }) => (
          <li key={_id}>
            {title} <button onClick={() => removeBook(_id)}>Delete Book</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      {view && <p>{message}</p>}
    </>
  );
};

function App() {
  const { data, error, loading } = useFetch(`${booksApi}/books`);

  const books = data?.data?.books;
  return (
    <>
      <h1>All Books</h1>
      {loading ? (
        <Loading />
      ) : data?.success ? (
        <BookList books={books} />
      ) : (
        <Error />
      )}
    </>
  );
}

export default App;
