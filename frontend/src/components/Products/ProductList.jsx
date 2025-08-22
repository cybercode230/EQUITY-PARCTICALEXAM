import { useEffect, useState, useContext } from "react";
import { getAllProducts } from "../../api/products.api";
import { AuthContext } from "../../context/AuthContext";

const ProductList = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProducts(res.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} - Stock: {p.stock}
            {user?.role === "admin" && (
              <>
                <button>Edit</button>
                <button>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
