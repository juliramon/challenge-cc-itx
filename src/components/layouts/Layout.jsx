import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <header className="pt-12">
      <div className="container">
        <nav className="border-b border-slate-300 pb-4">
          <Link to={"/"} title="Podcaster">
            <h1>Podcaster</h1>
          </Link>
        </nav>
      </div>
      <Outlet />
    </header>
  );
};

export default Layout;
