import http from "../http-common";

const getAll = () => {
  return http.get("/countries");
};

const get = id => {
  return http.get(`/countries/${id}`);
};

const create = data => {
  return http.post("/countries", data);
};

const update = (id, data) => {
  return http.put(`/countries/${id}`, data);
};

const remove = id => {
  return http.delete(`/countries/${id}`);
};

const removeAll = () => {
  return http.delete(`/countries`);
};

const findByCode = code => {
  return http.get(`/countries?code=${code}`);
};

const CountryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByCode
};

export default CountryService;