import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <>
      <header className="container px-4 mt-5 text-white rounded-3 h-50">
        <h1 className="display-5 fw-bold">Welcome to the armory</h1>
        <p className="col-md-8 lead">
          Your one stop shop for all your halo needs
        </p>
      </header>
      <div className="container">
        <div className="row justify-content-center">
          <h1 className=" mt-4 mb-5 text-center text-white">
            Product categories
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <Link
            className="d-flex align-items-end col-md-4 col-12 mb-5 mx-2 zoom-category weapon-bg"
            to="Weapons"
            style={{ textDecoration: 'none' }}>
            <h2 className="text-white">Weapons</h2>
          </Link>
          <Link
            className="d-flex align-items-end col-md-4 col-12 mb-5 mx-2  zoom-category vehicle-bg"
            to="Vehicles"
            style={{ textDecoration: 'none' }}>
            <h2 className="text-white">Vehicles</h2>
          </Link>
          <Link
            className="d-flex align-items-end col-md-4 col-12 mb-5 mx-2  zoom-category throwable-bg"
            to="Throwables"
            style={{ textDecoration: 'none' }}>
            <h2 className="text-white">Throwables</h2>
          </Link>
        </div>
      </div>
    </>
  );
}
