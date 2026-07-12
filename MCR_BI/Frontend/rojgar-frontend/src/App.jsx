import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DEFINE_APP_ROUTES } from "./constants/routes.constant";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { AddJob } from "./pages/AddJob";

const router = createBrowserRouter([
  {
    path: DEFINE_APP_ROUTES.HOME,
    element: <Home />,
  },
  {
    path: DEFINE_APP_ROUTES.JOB_DETAILS,
    element: <Details />,
  },
  {
    path: DEFINE_APP_ROUTES.ADD_JOB,
    element: <AddJob />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
