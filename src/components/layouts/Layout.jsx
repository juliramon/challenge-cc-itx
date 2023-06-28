import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <header className="pt-12">
      <div className="container">
        <nav className="border-b border-slate-300 pb-4">
          <Link to={"/"} title="Podcaster">
            <h1 className="font-normal text-blue-400 hover:text-blue-500 transition-all duration-300 ease-in-out">
              Podcaster
            </h1>
          </Link>
        </nav>
      </div>
      <Outlet />
    </header>
  );
};

export default Layout;
