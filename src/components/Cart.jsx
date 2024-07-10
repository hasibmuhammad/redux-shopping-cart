import { useEffect, useState } from "react";
import {
  loadFromLocalStorage,
  removeCart,
  updateQty,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  // handle remove cart
  const handleRemoveCart = (id) => {
    // dispatch the remove cart from here
    dispatch(removeCart({ id }));
  };

  // handle decrease qty
  const handleDecrease = (id, qty) => {
    if (qty === 1) {
      dispatch(removeCart({ id }));
    }
    // update the qty
    dispatch(updateQty({ id, qty, operation: "decrease" }));
  };

  // handle incerase
  const handleIncrease = (id, qty) => {
    dispatch(updateQty({ id, qty, operation: "increase" }));
  };
  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold tracking-widest uppercase">Cart</h1>
      <br />
      <hr />
      {cart.length === 0 && (
        <p className="text-3xl mt-20">
          Your cart is empty.{" "}
          <NavLink to={"/"} className="text-[#e74e3a] uppercase">
            Shop Now!
          </NavLink>
        </p>
      )}
      {cart.length > 0 && (
        <div className="mt-10">
          <div className="flex flex-col gap-4">
            {cart.map((c) => (
              <div key={c.id} className="space-y-4">
                <div className="flex justify-between items-center font-semibold text-xl ">
                  <h2 className="w-[250px] text-left">
                    {c.title.slice(0, 20)}
                  </h2>
                  <p className="text-left">${c.price.toFixed(2)}</p>
                  <div className="flex flex-wrap justify-between border-2 rounded-md w-[180px]">
                    <button
                      onClick={() => handleDecrease(c.id, c.qty)}
                      className="font-bold text-[#E74E3A] border-r-2 px-4"
                    >
                      -
                    </button>
                    <p className="">{c.qty}</p>
                    <button
                      onClick={() => handleIncrease(c.id, c.qty)}
                      className="font-bold text-[#E74E3A] border-l-2 px-4"
                    >
                      +
                    </button>
                  </div>
                  <p>${(c.qty * c.price).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveCart(c.id)}
                    className="text-red-600"
                  >
                    x
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto flex items-center justify-between my-5">
            <h3 className="text-2xl font-bold capitalize">Cart Total: </h3>
            <strong className="text-xl">${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
