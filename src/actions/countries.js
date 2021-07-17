import {
    CREATE_COUNTRY,
    RETRIEVE_COUNTRYS,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    DELETE_ALL_COUNTRYS,
  } from "./types";
  
  import CountryDataService from "../services/CountryService";
  
  export const createCountry = (title, description) => async (dispatch) => {
    try {
      const res = await CountryDataService.create({ title, description });
  
      dispatch({
        type: CREATE_COUNTRY,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveCountries = () => async (dispatch) => {
    try {
      const res = await CountryDataService.getAll();
  
      dispatch({
        type: RETRIEVE_COUNTRYS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateCountry = (id, data) => async (dispatch) => {
    try {
      const res = await CountryDataService.update(id, data);
  
      dispatch({
        type: UPDATE_COUNTRY,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteCountry = (id) => async (dispatch) => {
    try {
      await CountryDataService.remove(id);
  
      dispatch({
        type: DELETE_COUNTRY,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllCountries = () => async (dispatch) => {
    try {
      const res = await CountryDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_COUNTRYS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findCountriesBycode = (code) => async (dispatch) => {
    try {
      const res = await CountryDataService.findByCode(code);
  
      dispatch({
        type: RETRIEVE_COUNTRYS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };