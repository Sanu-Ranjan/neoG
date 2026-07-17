import { Filter } from "../components/Filter";
import { useSearchParams } from "react-router-dom";
export function Home() {
  const [searchParam] = useSearchParams();

  return (
    <div>
      <h1>Home</h1>
      <h2>Filters</h2>
      <Filter />
      <p>{searchParam.toString()}</p>
    </div>
  );
}
