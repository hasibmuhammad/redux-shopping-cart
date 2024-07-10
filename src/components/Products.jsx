import { useDispatch } from "react-redux";
import { addtoCart } from "../features/cart/cartSlice";
import FloatingCart from "./FloatingCart";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const Products = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleAddtoCart = (id) => {
    const product = items.find((item) => item.id === id);
    dispatch(addtoCart({ ...product, qty: 1 }));
    setAddedToCart(true);
    setAddingId(id);
  };

  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold tracking-widest uppercase">Products</h1>
      <br />
      <hr />
      {loading && (
        <div className="mt-10">
          <Skeleton />
        </div>
      )}
      {!loading && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center ">
          {items.map((product, idx) => (
            <div
              key={idx}
              className="border rounded-md w-[300px] text-left space-y-2 px-5 py-5 shadow-2xl"
            >
              <img
                className="w-full h-[250px] object-cover rounded-lg"
                src={product.image}
                alt=""
              />
              <h2 className="text-xl font-semibold">
                {product.title.slice(0, 20)}
              </h2>
              <p className="uppercase">{product.category}</p>
              <p>${product.price}</p>
              <button
                onClick={() => handleAddtoCart(product.id)}
                className={`hover:bg-[#E74E3A] hover:duration-500 hover:transition-all hover:scale-110  px-4 py-2 ${
                  addingId === product.id && addedToCart
                    ? "bg-[#e74e3a]"
                    : "bg-purple-500"
                } rounded-lg font-bold`}
              >
                {addingId === product.id && addedToCart
                  ? "Added To Cart"
                  : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
      <FloatingCart />
    </div>
  );
};

export default Products;
