import { NavLink } from "react-router-dom";
import cartIcon from "/cart.svg";
const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-[#e74e3a]" : ""
            }
            to={"/"}
          >
            <img className="w-24 h-24" src={cartIcon} alt="" />
          </NavLink>
        </div>
        <ul className="flex items-center justify-center gap-10 text-2xl font-bold">
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-[#e74e3a]" : ""
            }
            to={"/"}
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-[#e74e3a]" : ""
            }
            to={"/cart"}
          >
            Cart
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
