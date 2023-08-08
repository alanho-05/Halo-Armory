export function ProductQuantity({
  updatedQuantity,
  setUpdatedQuantity,
  updateItem,
}) {
  return (
    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 d-flex align-items-center">
      <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
        <button
          className="btn btn-primary px-3 py-2 me-2 fas fa-minus"
          style={{ margin: '1rem 0' }}
          onClick={() => {
            if (updatedQuantity <= 1) return;
            setUpdatedQuantity(Number(updatedQuantity) - 1);
            updateItem(Number(updatedQuantity) - 1);
          }}
        />
        <div className="form-outline">
          <span className="form-label">Quantity</span>
          <span className="input-group-text border border-secondary px-3 fw-bold">
            {updatedQuantity}
          </span>
        </div>
        <button
          className="btn btn-primary px-3 py-2 ms-2 fas fa-plus"
          style={{ margin: '1rem 0' }}
          onClick={() => {
            setUpdatedQuantity(Number(updatedQuantity) + 1);
            updateItem(Number(updatedQuantity) + 1);
          }}
        />
      </div>
    </div>
  );
}
