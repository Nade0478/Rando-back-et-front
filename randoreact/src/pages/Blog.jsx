import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import BlogForm from "../components/blog/BlogForm";
import DarkModeForm from "../components/DarkModeForm";

const Blog = () => {
  const exampleArticle = {
    title: "Article exemple",
    // Ajoutez d'autres propriétés si nécessaire
  };

  return (
    <div className="page-wrapper">
      <Menu />
      <DarkModeForm />
      <div className="root">
        <div className="container-fluid">
          <h1>Bienvenue sur mon blog</h1>
          <p>Cette page contient des articles de blog.</p>
          <BlogForm article={exampleArticle} />{" "}
          {/* Transmission de données test */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
