import { useSearchParams } from "react-router-dom";
export const Filter = () => {
  const [category, setCategory] = useSearchParams();

  const selected = category.get("category");
  console.log(selected);

  function handleChange(e) {
    const querry = new URLSearchParams(category);
    querry.set("category", e.target.value);

    setCategory(querry);
  }

  function isSelected(category) {
    return category === selected;
  }

  return (
    <>
      <input
        checked={isSelected("category1")}
        type="radio"
        name="category"
        id="category1"
        value={"category1"}
        onChange={handleChange}
      />{" "}
      category1
      <input
        type="radio"
        name="category"
        id="category2"
        value={"category2"}
        checked={isSelected("category2")}
        onChange={handleChange}
      />{" "}
      category2
      <input
        type="radio"
        name="category"
        id="category3"
        value={"category3"}
        checked={isSelected("category3")}
        onChange={handleChange}
      />{" "}
      category3
      <input
        type="radio"
        name="category"
        id="category4"
        value={"category4"}
        checked={isSelected("category4")}
        onChange={handleChange}
      />{" "}
      category4
      <input
        type="radio"
        name="category"
        id="category5"
        value={"category5"}
        checked={isSelected("category5")}
        onChange={handleChange}
      />{" "}
      category5
    </>
  );
};
