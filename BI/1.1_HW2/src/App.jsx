import useFetch from "./useFetch";
import { useState } from "react";

const RecipeList = ({ recipes, onSelect, selectedTitle }) => {
  return (
    <ul>
      {recipes?.map(({ title }) => (
        <li
          key={title}
          onClick={() => onSelect(title)}
          style={{
            cursor: "pointer",
            fontWeight: selectedTitle === title ? "bold" : "normal",
            textDecoration: selectedTitle === title ? "underline" : "none",
          }}
        >
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
};

const RecipeSelect = ({ title }) => {
  const recipeApi = import.meta.env.VITE_RECIPE_API;
  const uriComponent = encodeURIComponent(title);
  const { data, error, loading } = useFetch(
    `${recipeApi}/recipe/title/${uriComponent}`,
  );
  const [showInstructions, setShowInstructions] = useState(false);

  const recipe = data?.data?.data;

  return (
    <>
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading recipe</p>
      ) : data?.success ? (
        <>
          <p>
            <strong>Author:</strong> {recipe.author}
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Prep Time:</strong> {recipe.prepTime} mins
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cookTime} mins
          </p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingerdients?.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>

          {showInstructions ? (
            <>
              <h3>Instructions</h3>
              <ol>
                {recipe.instructions?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <button onClick={() => setShowInstructions(false)}>
                Show Less
              </button>
            </>
          ) : (
            <button onClick={() => setShowInstructions(true)}>
              View More (Instructions)
            </button>
          )}

          {recipe.imageUrl?.[0] && (
            <img
              src={recipe.imageUrl[0]}
              alt={title}
              style={{ width: "300px", marginTop: "1rem" }}
            />
          )}
        </>
      ) : (
        <p>Recipe not found</p>
      )}
    </>
  );
};
function App() {
  const recipeApi = import.meta.env.VITE_RECIPE_API;
  const { data, error, loading } = useFetch(`${recipeApi}/recipe`);
  const [selectedTitle, setSelectedTitle] = useState(null);

  return (
    <>
      <h1>Recipes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading recipes</p>
      ) : (
        data && (
          <RecipeList
            recipes={data?.data?.data}
            onSelect={setSelectedTitle}
            selectedTitle={selectedTitle}
          />
        )
      )}

      {selectedTitle && <RecipeSelect title={selectedTitle} />}
    </>
  );
}

export default App;
