import { tableView } from './views.js'

const URL = "https://reqres.in/api/users?delay=3"

// Utils
const getHTMLElement = (selector) => document.querySelector(selector);
const useLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const readLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

// Services
const getDataFromApi = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error));
};

// Main
const readUsers = async () => {
  let { time = 0, data = [] } = readLocalStorage("users") || {};
  if (time > Date.now()) return tableView.render(data);

  tableView.renderSpinner();
  const users = await getDataFromApi(URL);
  useLocalStorage("users", {
    data: users,
    time: Date.now() + 60000,
  });
  tableView.render(users);
};

// DOM
const btnReadUsersElement = getHTMLElement("#btn-read-users");
btnReadUsersElement.addEventListener("click", readUsers);