import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  retrieveCountries,
  findCountriesBycode,
  deleteAllCountries,
} from "../actions/countries";

const CountriesList = () => {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchcode, setSearchcode] = useState("");

  const Countries = useSelector(state => state.Countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCountries());
  }, []);

  const onChangeSearchcode = e => {
    const searchcode = e.target.value;
    setSearchcode(searchcode);
  };

  const refreshData = () => {
    setCurrentCountry(null);
    setCurrentIndex(-1);
  };

  const setActiveCountry = (Country, index) => {
    setCurrentCountry(Country);
    setCurrentIndex(index);
  };

  const removeAllCountries = () => {
    dispatch(deleteAllCountries())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findBycode = () => {
    refreshData();
    dispatch(findCountriesBycode(searchcode));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by code"
            value={searchcode}
            onChange={onChangeSearchcode}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBycode}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Countries List</h4>

        <ul className="list-group">
          {Countries &&
            Countries.map((Country, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCountry(Country, index)}
                key={index}
              >
                {Country.code}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCountries}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCountry ? (
          <div>
            <h4>Country</h4>
            <div>
              <label>
                <strong>code:</strong>
              </label>{" "}
              {currentCountry.code}
            </div>
            <div>
              <label>
                <strong>name:</strong>
              </label>{" "}
              {currentCountry.name}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCountry.status ? "status" : "Pending"}
            </div>

            <Link
              to={"/Countries/" + currentCountry.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Country...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesList;