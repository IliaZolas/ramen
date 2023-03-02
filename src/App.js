import './App.css';
import Navbar from './components/navbar';
import Footer from "./components/footer";
import Home from './pages/home';
import Ramen from './pages/ramen';
import Ingredient from './pages/ingredients';
import NewRamen from './pages/newRamen';
import NewIngredient from './pages/newIngredient';
import UpdateRamen from './pages/updateRamen';
import UpdateIngredient from './pages/updateIngredient';
import ShowRamen from './pages/showRamen';
import ShowIngredient from './pages/showIngredient';
import AddUser from './pages/signup';
import LoginUser from './pages/login';
import ShowUser from './pages/account';
import UpdateUser from './pages/updateUser';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { UserContext } from "./UserContext";
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { config } from './config/config';
const URL = config.url;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');

    if (id !== null) {
      console.log("condition true")
    fetch(`${URL}/app/user/show/${id}`, {
        method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }},
    []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route 
                path="/" 
                element={<Home />} 
                />
              <Route 
                path="/ramen" 
                element={<Ramen />} 
              />
              <Route 
                path="/ramen/show/:id" 
                element={<ShowRamen />} 
                />
                <Route 
                path="/ingredient/show/:id" 
                element={<ShowIngredient />} 
                />
              <Route 
                path="/signup" 
                element={<AddUser />} 
                />
              <Route 
                path="/login" 
                element={<LoginUser />} 
                />
              <Route element={<ProtectedRoutes/>}>
                <Route
                  path="/new-ramen" 
                  element={
                    <NewRamen />   
                  }
                  />
                  <Route
                  path="/new-ingredient" 
                  element={
                    <NewIngredient />   
                  }
                  />
                  <Route
                  path="/ingredients" 
                  element={
                    <Ingredient />   
                  }
                  />
                <Route
                  path="/ingredient/update/:id" 
                  element={
                    <UpdateIngredient />   
                  }
                />
                <Route
                  path="/ramen/update/:id" 
                  element={
                    <UpdateRamen />
                  }
                  />
                <Route
                  path="/user/show/:id" 
                  element={
                    <ShowUser />
                  }
                />
                <Route
                  path="/user/update/:id" 
                  element={
                    <UpdateUser />
                  }
                  />
              </Route>
          </Routes>
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;