export default function AddressList({ address }) {
  return (
    <div className="form-check my-5">
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
      />
      <label className="form-check-label" for="flexRadioDefault1">
        <div className="d-flex flex-column">
          <span className="address__detail">{address.addr_street}</span>
          <span className="address__detail">{address.addr_barangay}</span>
          <span className="address__detail">{address.addr_city}</span>
          <span className="address__detail">{address.addr_province}</span>
          <span className="address__detail">{address.addr_zip}</span>
          <span className="address__detail">{address.addr_country}</span>
        </div>
      </label>
    </div>
  );
}
