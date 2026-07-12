import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DEFINE_APP_ROUTES, APP_ROUTES } from "./constants/routes.constant";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { AddJob } from "./pages/AddJob";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: DEFINE_APP_ROUTES.HOME,
        element: <Home />,
      },
      {
        path: DEFINE_APP_ROUTES.ADD_JOB,
        element: <AddJob />,
      },
      {
        path: DEFINE_APP_ROUTES.JOB_DETAILS,
        element: <Details />,
      },
    ],
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
