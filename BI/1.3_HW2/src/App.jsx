import { useState } from "react";
import useFetch from "./useFetch";

const recipeApi = import.meta.env.VITE_RECIPE_API;

const Loading = () => <p>Loading...</p>;

const Error = () => <p>Error Loading Books</p>;

const RecipeList = ({ recipe }) => {
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);

  if (recipe.length === 0) return <p>No recipe present</p>;

  const removeRecipe = async (_id) => {
    setView(true);
    try {
      const res = await fetch(`${recipeApi}/recipe/id/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!json.success) {
        return setMessage("Recipe not Found");
      }

      setMessage("Recipe deleted Successfully");
    } catch (error) {
      setMessage("Error deleting Recipe", error);
    }
    setTimeout(() => {
      setView(false);
      window.location.reload();
    }, 5000);
  };

  return (
    <>
      <ul>
        {recipe.map(({ title, _id }) => (
          <li key={_id}>
            {title}{" "}
            <button onClick={() => removeRecipe(_id)}>Delete Recipe</button>
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
  const { data, error, loading } = useFetch(`${recipeApi}/recipe`);

  const recipe = data?.data?.data;
  return (
    <>
      <h1>All Recipes</h1>
      {loading ? (
        <Loading />
      ) : data?.success ? (
        <RecipeList recipe={recipe} />
      ) : (
        <Error />
      )}
    </>
  );
}

export default App;
