import { Layout } from "../components/Layout";
import { useBooks } from "../hooks/useBooks";
import { useState } from "react";

const Home = () => {
  const { books, loader, error, addBook, handleDelete, handleComplete } =
    useBooks();
  const [bookName, setBookName] = useState("");
  const [pages, setPages] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!bookName || !pages) return;

    const newBook = {
      name: bookName,
      pages: Number(pages),
      status: false,
    };

    await addBook(newBook);

    setBookName("");
    setPages("");
  };

  return (
    <Layout>
      {loader && <h2>Cargando...</h2>}
      {error && <h2>{error}</h2>}

      <ul className="book-list">
        <li>
          <form onSubmit={(e) => handleAddBook(e)} className="add-book-form">
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Nombre"
              required
            />
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="Cantidad de paginas"
              required
            />
            <button type="submit">Agregar Libro</button>
          </form>
        </li>
        {books.length > 0 && (
          <li className="book-list-header">
            <p>{"Nombre"}</p>
            <p>{"Paginas"}</p>
            <p>{"Estado"}</p>
            <span>{"Acciones"}</span>
          </li>
        )}
        {books.map((book) => (
          <li className="book-list-item" key={book._id}>
            <h6>{book.name}</h6>
            <p>{book.pages}</p>
            <p>{book.status ? "Completado" : "Pendiente"}</p>
            <div>
              {!book.status && (
                <button onClick={() => handleComplete(book._id)}>
                  {book.status ? "Leido" : "Leer"}
                </button>
              )}
              <button onClick={() => handleDelete(book._id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export { Home };
