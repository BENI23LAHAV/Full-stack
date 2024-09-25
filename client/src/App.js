import "./App.css";
import Yom_zvaa from "./Components/Yom_zvaa";
import "./App.css";
import { useState, createContext } from "react";
import Home from "./Components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Albums from "./Components/Albums";
import Todos from "./Components/Todos";

import Photos from "./Components/Photos";

import NewTodo from "./Components/NewTodo";

/*------------the main user------------------- */
export const UserContext = createContext();
export const AlbumId = createContext();
function App() {
  const [user, setUser] = useState("");
  const [albumId, setAlbumId] = useState(1);
  return (
    <div className="App">
      <header className="App-header">
        <Yom_zvaa />
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <h3>{user.city}</h3>
        <button>
          <Link to={"/"}>Home</Link>
        </button>

        {/*--------------make user global-------------------- */}
        <UserContext.Provider value={[user, setUser]}>
          <AlbumId.Provider value={[albumId, setAlbumId]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />}>
                <Route path="/posts/some" element={<h1>Some</h1>} />
              </Route>

              <Route path="/albums" element={<Albums />} />

              <Route path="/todos" element={<Todos />} />
              <Route path="/photos" element={<Photos />} />

              <Route path="/todos">
                <Route index element={<Todos />} />
                {/* <Route path="new" element={<NewTodo />} /> */}
              </Route>

              <Route path="/todos" element={<Todos />} />
              <Route path="/photos" element={<Photos />} />

              <Route path="*" element={<h1>Error 404 page not found</h1>} />
            </Routes>
          </AlbumId.Provider>
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
