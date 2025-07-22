import { useEffect, useState } from "react";
import { createBook, deleteBooks, getBooks, updateBook } from "../services/api";
import { useAuth } from "../context/authContext";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchingBooks = async () => {
      setLoader(true);
      try {
        const books = await getBooks(token);
        setBooks(books);
      } catch (error) {
        setError("Error al recuperar los libros: " + error.message);
      } finally {
        setLoader(false);
      }
    };

    if (token) fetchingBooks();
  }, [token]);

  const addBook = async (book) => {
    try {
      const data = await createBook(book, token);
      setBooks((prev) => [data, ...prev]);
    } catch (error) {
      setError(error.message || "Error al crear el libro");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Estás seguro de que quieres borrar este libro?")) {
        await deleteBooks(id, token);
        setBooks(books.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComplete = async (_id) => {
    try {
      const data = await updateBook(_id, true, token);
      setBooks(books.map((t) => (t._id === _id ? data : t)));
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return {
    books,
    loader,
    error,
    addBook,
    handleDelete,
    handleComplete,
  };
};

export { useBooks };
