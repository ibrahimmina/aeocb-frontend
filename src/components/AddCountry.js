import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCountry } from "../actions/countries";

const AddCountry = () => {
  const initialCountryState = {
    id: null,
    code: "",
    name: "",
    status: 0
  };
  const [Country, setCountry] = useState(initialCountryState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCountry({ ...Country, [name]: value });
  };

  const saveCountry = () => {
    const { code, name, status } = Country;

    dispatch(createCountry(code, name))
      .then(data => {
        setCountry({
          id: data.id,
          code: data.code,
          name: data.name,
          status: data.status
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCountry = () => {
    setCountry(initialCountryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCountry}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="code">code</label>
            <input
              type="text"
              className="form-control"
              id="code"
              required
              value={Country.code}
              onChange={handleInputChange}
              name="code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Country.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <button onClick={saveCountry} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCountry;