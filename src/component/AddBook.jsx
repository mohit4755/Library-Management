import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [form, setForm] = useState({ title: '', author: '', description: '', category: '', rating: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((field) => !field)) {
      alert('Please fill in all fields.');
      return;
    }
    dispatch(addBook({ ...form, id: Date.now() }));
    navigate('/books/all');
  };

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="rating" placeholder="Rating" onChange={handleChange} />
      <button type="submit">Add Book</button>
    
    </form>
  );
};

export default AddBook;
