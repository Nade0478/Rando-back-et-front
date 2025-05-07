import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Blog from "./pages/Blog"; 
import Home from "./pages/Home"; 
import About from "./pages/About";
import Contact from "./pages/Contact";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import Article from "./pages/article/Article";
import AddArticle from "./pages/article/AddArticle";
import EditArticle from "./pages/article/EditArticle";

import Opinion from "./pages/opinion/Opinion";
import AddOpinion from "./pages/opinion/AddOpinion";
import EditOpinion from "./pages/opinion/EditOpinion";

import Category from "./pages/category/Category";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";

import Place from "./pages/place/Place";
import AddPlace from "./pages/place/AddPlace";
import EditPlace from "./pages/place/EditPlace";
import ShowPlace from "./pages/place/ShowPlace";
import Page from "./pages/place/Page";

import Profil from "./pages/Profil";

import Role from "./pages/Role";
import Dashboard from "./pages/Dashboard";

// import AddHome from "./pages/home/AddHome";
// import EditHome from "./pages/home/EditHome";

// import AddBlog from "./pages/blog/AddBlog";
// import EditBlog from "./pages/blog/EditBlog";
import User from "./pages/User";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ShowUser from "./pages/user/ShowUser";

import ShowArticle from "./pages/article/ShowArticle";
import ShowOpinion from "./pages/opinion/ShowOpinion";
import FaqPage from "./pages/divers/FaqPage";



const App = () => { 
  return ( 
    <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/blog" element={<Blog />} /> 
          {/* <Route path="/blog/add" element={<AddBlog />} />  */}
          {/* <Route path="/blog/edit/:blog" element={<EditBlog />} /> */}
          {/* <Route path="/home/Add" element={<AddHome />} /> */}
          {/* <Route path="/home/Edit/:home" element={<EditHome />} /> */}

          <Route path="/contact" element={<Contact />} /> 

          <Route path="/article" element={<Article />} /> 
          <Route path="/article/add" element={<AddArticle />} /> 
          <Route path="/article/edit/:article" element={<EditArticle />} /> 
          <Route path="/article/show/:id" element={<ShowArticle />} /> 

          <Route path="/category" element={<Category />} /> 
          <Route path="/category/Add" element={<AddCategory />} /> 
          <Route path="/Category/Edit/:category" element={<EditCategory />} /> 

          <Route path="/Place" element={<Place />} /> 
          <Route path="/Place/Add" element={<AddPlace />} /> 
          <Route path="/place/Edit/:place" element={<EditPlace />} /> 
          <Route path="/place/page" element={<Page />} />  {/* Route vers Page */}

          <Route path="/place/show/:id" element={<ShowPlace />} />
          <Route path="/opinion" element={<Opinion />} /> 
          <Route path="/opinion/Add" element={<AddOpinion />} /> 
          <Route path="/opinion/Edit/:opinion" element={<EditOpinion />} /> 
          <Route path="/opinion/show/:id" element={<ShowOpinion />} />


          <Route path="/dashboard" element={<Dashboard />} /> 

          <Route path="/" element={<Login />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="/role" element={<Role />} />

          {/* Auth routes */}
          {/* <Route path="/Auth/Register" element={<Register />} /> 
          <Route path="/Auth/Login" element={<Login />} />  */}

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="*" element={<Home />} /> 
          <Route path="/home" element={<Home />} />
          {/* <Route path="/home/add" element={<AddHome />} />  */}
          {/* <Route path="/home/edit" element={<EditHome />} />  */}

          {/* Admin routes */}
          <Route path="/user" element={<User />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/user/show/:id" element={<ShowUser />} />
          <Route path="/user/add" element={<AddUser />} />

          <Route path="divers/FaqPage" element={<FaqPage />} />



          {/* <Route path="/user/add" element={<AddUser />} />  */}
          {/* <Route path="/user/edit/:article" element={<EditUser />} /> 
          <Route path="/user/show/:id" element={<ShowUser />} />  */}


        </Routes> 
    </BrowserRouter> 
  ); 
}; 
 
export default App;
