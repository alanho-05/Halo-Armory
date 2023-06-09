import './NavBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav class="navbar navbar-dark bg-nav fixed-top">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="offcanvas offcanvas-start text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Logo
            </h3>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <Link to="/">Home</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <Link to="/signIn">Sign In</Link>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Products
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a class="dropdown-item" href="#">
                      <Link to="/weapons">Weapons</Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <Link to="/vehicles">Vehicles</Link>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <Link to="/throwables">Throwables</Link>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <a class="navbar-brand" href="#">
          Logo
        </a>
        <i class="bi bi-bag white-font lead"></i>
      </div>
    </nav>
  );
}
