import { useState, useEffect } from "react";

const API_URL = "https://api.example.com/products";

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      fetchProducts();
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        is_active: true,
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 gap-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="border p-2"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="border p-2"
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
          className="border p-2"
        />
        <input
          type="text"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
          className="border p-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />{" "}
          Activo
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg shadow">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-32 h-32 object-contain mx-auto mb-2"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <p
              className={product.is_active ? "text-green-600" : "text-red-600"}
            >
              {product.is_active ? "Activo" : "Inactivo"}
            </p>
            <button
              onClick={() => handleEdit(product)}
              className="bg-yellow-500 text-white p-1 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white p-1 rounded ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCRUD;
