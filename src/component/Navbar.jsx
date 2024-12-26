import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/books/all">Browse Books</Link>
    <Link to="/add-book">Add Book</Link>
  </nav>
);

export default Navbar;
