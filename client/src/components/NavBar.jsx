import { useContext, useState } from 'react';
import AppContext from '../components/AppContext';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function NavBar() {
  const { user, handleSignOut } = useContext(AppContext);

  return (
    <>
      <nav
        style={{ position: 'sticky', top: '0', zIndex: '1' }}
        className="navbar navbar-dark bg-nav">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabIndex={-1}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h3 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Halo Armory
              </h3>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <div className="nav-link">
                    <Link
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                      to="/">
                      Home
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle text-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Products
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="text-white"
                          style={{ textDecoration: 'none' }}
                          to="/weapons">
                          Weapons
                        </Link>
                      </div>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="text-white"
                          style={{ textDecoration: 'none' }}
                          to="/vehicles">
                          Vehicles
                        </Link>
                      </div>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="text-white"
                          style={{ textDecoration: 'none' }}
                          to="/throwables">
                          Throwables
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <div className="nav-link">
                    {user && (
                      <a
                        className="text-white"
                        href="#"
                        style={{ textDecoration: 'none' }}
                        onClick={handleSignOut}>
                        Sign out
                      </a>
                    )}
                    {!user && (
                      <Link
                        className="text-white"
                        style={{ textDecoration: 'none' }}
                        to="/sign-in">
                        Sign In
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Link
            className="text-white navbar-brand"
            style={{ textDecoration: 'none' }}
            to="/">
            Halo Armory
          </Link>
          <Link to="/cart">
            <i className="bi bi-bag text-white fs-4"></i>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
