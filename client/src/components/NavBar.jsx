import './NavBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-nav">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
          </button>
          <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h3 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Logo
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
                      className="white-font"
                      style={{ textDecoration: 'none' }}
                      to="/">
                      Home
                    </Link>
                  </div>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <div className="nav-link">
                    <Link
                      className="white-font"
                      style={{ textDecoration: 'none' }}
                      to="/signIn">
                      Sign In
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle white-font"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Products
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="white-font"
                          style={{ textDecoration: 'none' }}
                          to="/weapons">
                          Weapons
                        </Link>
                      </div>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="white-font"
                          style={{ textDecoration: 'none' }}
                          to="/vehicles">
                          Vehicles
                        </Link>
                      </div>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <div className="nav-link dropdown-padding">
                        <Link
                          className="white-font"
                          style={{ textDecoration: 'none' }}
                          to="/throwables">
                          Throwables
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <a className="navbar-brand" href="#">
            Logo
          </a>
          <i className="bi bi-bag white-font fs-4 position-relative">
            <span class="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger fs-65">
              0
            </span>
          </i>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
