import {
    CREATE_COUNTRY,
    RETRIEVE_COUNTRYS,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
    DELETE_ALL_COUNTRYS,
  } from "../actions/types";
  
  const initialState = [];
  
  function countryReducer(countries = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_COUNTRY:
        return [...countries, payload];
  
      case RETRIEVE_COUNTRYS:
        return payload;
  
      case UPDATE_COUNTRY:
        return countries.map((country) => {
          if (country.id === payload.id) {
            return {
              ...country,
              ...payload,
            };
          } else {
            return country;
          }
        });
  
      case DELETE_COUNTRY:
        return countries.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_COUNTRYS:
        return [];
  
      default:
        return countries;
    }
  };
  
  export default countryReducer;