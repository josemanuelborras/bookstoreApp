// const API_URL = import.meta.env.VITE_API_URL
const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development";

const API_URL =
  NODE_DEV === "production"
    ? import.meta.env.VITE_BASE_API_URL
    : "http://localhost:8000/";

const getBooks = async (token) => {
  const response = await fetch(`${API_URL}books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const createBook = async (bookData, token) => {
  const res = await fetch(`${API_URL}newBook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al guardar el libro");
  }

  return data;
};

const deleteBooks = async (id, token) => {
  await fetch(`${API_URL}bookDelete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateBook = async (id, completed, token) => {
  const res = await fetch(`${API_URL}bookUpdate/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: completed }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al actualizar el libro");
  }

  return data;
};

export { getBooks, createBook, deleteBooks, updateBook };
