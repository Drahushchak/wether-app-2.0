import "./App.css";
import { LoaderFunction, Outlet, redirect } from "react-router-dom";

function App() {

  return <div className="app">
    <Outlet />
  </div>
}

const appLoader: LoaderFunction = async ({request}) =>  {
  const storedUser = localStorage.getItem("persist:user");
  const user = storedUser && JSON.parse(storedUser);
  const isLoggedIn = user?.loggedInUser !== 'null';
  const url = new URL(request.url);
  const unAuthRoutes = new Set(["/login", "/register"]);
  if (isLoggedIn && (unAuthRoutes.has(url.pathname) || url.pathname==="/")) return redirect("/home");
  if (!isLoggedIn && (!unAuthRoutes.has(url.pathname) || url.pathname==="/")) return redirect("/login");
  return null;
}

export { appLoader };
export default App;
