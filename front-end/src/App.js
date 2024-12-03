import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useContext } from "react";
import { AuthContext } from "./Context/authContext";
import Reserve from "./components/reserve/Reserve";
import HomeLoves from "./components/homeloves/HomeLoves";

function App() {
  const {state} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={state.user ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/hotels" element={<List/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reserve" element={<Reserve/>}/>
          <Route path="/homeloves" element={<HomeLoves/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
