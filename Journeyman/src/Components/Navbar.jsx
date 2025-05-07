import React from "react";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">Journeyman</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
             <Link>About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
