import { Link } from 'react-router-dom';

export default function Catalog({ catalog }) {
  return (
    <>
      <div className="card-group">
        <div className="card">
          <img
            src="https://halo.wiki.gallery/images/thumb/e/e8/HInf_MA40_cutout_2.png/799px-HInf_MA40_cutout_2.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src="https://halo.wiki.gallery/images/thumb/a/af/HINF_BR75_Crop_2.png/800px-HINF_BR75_Crop_2.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
        <div className="card">
          <img
            src="https://halo.wiki.gallery/images/9/98/H5G-Render-Carbine.png"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
