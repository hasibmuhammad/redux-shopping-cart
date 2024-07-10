import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFromLocalStorage } from "../features/cart/cartSlice";
import cartIcon from "/cart.svg";
import { NavLink } from "react-router-dom";

const FloatingCart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const cartTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.qty * cartItem.price,
    0
  );

  const totalQty = cartItems.reduce((curr, acc) => curr + acc.qty, 0);
  return (
    <>
      <NavLink className="cursor-pointer" to={"/cart"}>
        <div className="relative">
          <div className="aboslute fixed bottom-5 right-5 md:bottom-10 md:right-10">
            <div className="relative">
              <div className="absolute bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center font-bold -left-5 -top-5 hover:bg-[#E74E3A] cursor-pointer">
                {cartItems.length}
              </div>

              {/* <div className="absolute font-bold text-xl text-[#e74e3a] top-16 left-12">
            {totalQty}
          </div> */}
              <img className="w-28 h-28" src={cartIcon} alt="" />
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default FloatingCart;
