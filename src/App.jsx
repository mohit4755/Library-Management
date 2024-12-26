import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import BrowseBooks from './component/BrowseBooks';
import BookDetails from './component/BookDetails';
import AddBook from './component/AddBook';
import NotFound from './component/NotFound';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:category" element={<BrowseBooks />} />
      <Route path="/books/details/:id" element={<BookDetails />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
