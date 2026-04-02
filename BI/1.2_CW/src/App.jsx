import { useState } from "react";
import { useForm } from "react-hook-form";

const AddBookForm = ({ onBookAdded }) => {
  const bookApi = import.meta.env.VITE_BOOK_API;
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    setError(null);

    const payload = {
      ...formData,
      genre: formData.genre
        ? formData.genre.split(",").map((g) => g.trim())
        : [],
      publishedYear: Number(formData.publishedYear),
      rating: formData.rating ? Number(formData.rating) : undefined,
    };

    try {
      const res = await fetch(`${bookApi}/books/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        onBookAdded(json.data.data);
        reset();
      } else {
        setError(json.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a Book</h2>

      <div>
        <label>Title</label>
        <input {...register("title", { required: "Title is required" })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <br />
      <br />
      <div>
        <label>Author</label>
        <input {...register("author", { required: "Author is required" })} />
        {errors.author && <p>{errors.author.message}</p>}
      </div>
      <br />
      <br />
      <div>
        <label>Published Year</label>
        <input
          type="number"
          {...register("publishedYear", {
            required: "Published year is required",
          })}
        />
        {errors.publishedYear && <p>{errors.publishedYear.message}</p>}
      </div>
      <br />
      <br />
      <div>
        <label>
          Genre <span>(optional, comma separated e.g. Fiction, Drama)</span>
        </label>
        <input {...register("genre")} />
      </div>
      <br />
      <br />
      <div>
        <label>Language</label>
        <input
          {...register("language", { required: "Language is required" })}
        />
        {errors.language && <p>{errors.language.message}</p>}
      </div>
      <br />
      <br />
      <div>
        <label>
          Country <span>(optional, defaults to United States)</span>
        </label>
        <input {...register("country")} />
      </div>
      <br />
      <br />
      <div>
        <label>
          Rating <span>(optional, 0 - 10)</span>
        </label>
        <input
          type="number"
          step="0.1"
          {...register("rating", {
            min: { value: 0, message: "Rating must be at least 0" },
            max: { value: 10, message: "Rating must be at most 10" },
          })}
        />
        {errors.rating && <p>{errors.rating.message}</p>}
      </div>
      <br />
      <br />
      <div>
        <label>
          Summary <span>(optional)</span>
        </label>
        <textarea {...register("summary")} />
      </div>
      <br />
      <br />
      <div>
        <label>
          Cover Image URL <span>(optional)</span>
        </label>
        <input {...register("coverImageUrl")} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
};

const BookCard = ({ book }) => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}
    >
      {book.coverImageUrl && (
        <img
          src={book.coverImageUrl}
          alt={book.title}
          style={{ width: "120px" }}
        />
      )}
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Published Year:</strong> {book.publishedYear}
      </p>
      {book.genre?.length > 0 && (
        <p>
          <strong>Genre:</strong> {book.genre.join(", ")}
        </p>
      )}
      <p>
        <strong>Language:</strong> {book.language}
      </p>
      {book.country && (
        <p>
          <strong>Country:</strong> {book.country}
        </p>
      )}
      {book.rating !== undefined && (
        <p>
          <strong>Rating:</strong> {book.rating} / 10
        </p>
      )}
      {book.summary && (
        <p>
          <strong>Summary:</strong> {book.summary}
        </p>
      )}
    </div>
  );
};

function App() {
  const [addedBook, setAddedBook] = useState(null);

  return (
    <>
      <h1>Books</h1>
      <AddBookForm onBookAdded={setAddedBook} />
      {addedBook && (
        <>
          <h2>Book Added Successfully! </h2>
          <BookCard book={addedBook} />
        </>
      )}
    </>
  );
}

export default App;
