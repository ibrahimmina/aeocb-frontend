import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCountry, deleteCountry } from "../actions/countries";
import CountryDataService from "../services/CountryService";

const Country = (props) => {
  const initialCountriestate = {
    id: null,
    code: "",
    name: "",
    status: false
  };
  const [currentCountry, setCurrentCountry] = useState(initialCountriestate);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getCountry = id => {
    CountryDataService.get(id)
      .then(response => {
        setCurrentCountry(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCountry(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCountry({ ...currentCountry, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentCountry.id,
      code: currentCountry.code,
      name: currentCountry.name,
      status: status
    };

    dispatch(updateCountry(currentCountry.id, data))
      .then(response => {
        console.log(response);

        setCurrentCountry({ ...currentCountry, status: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateCountry(currentCountry.id, currentCountry))
      .then(response => {
        console.log(response);

        setMessage("The Country was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeCountry = () => {
    dispatch(deleteCountry(currentCountry.id))
      .then(() => {
        props.history.push("/Countries");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCountry ? (
        <div className="edit-form">
          <h4>Country</h4>
          <form>
            <div className="form-group">
              <label htmlFor="code">code</label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="code"
                value={currentCountry.code}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCountry.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCountry.status ? "status" : "Pending"}
            </div>
          </form>

          {currentCountry.status ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeCountry}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Country...</p>
        </div>
      )}
    </div>
    );
};

export default Country;