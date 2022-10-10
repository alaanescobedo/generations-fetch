const getHTMLElement = (selector) => document.querySelector(selector);

const tableBodyElement = getHTMLElement("#table-body");
const btnReadUsersElement = getHTMLElement("#btn-read-users");

const printUsers = (data) => {
  data.forEach((user) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
      <td>${user.id}</td>
      <td>${user.email}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td><img src="${user.avatar}" alt="avatar" class="rounded-circle w-50" /></td>
    `;
    tableBodyElement.appendChild(trElement);
  });
};

const readUsers = async () => {
  let usersData = JSON.parse(localStorage.getItem("users"));
  if (usersData && usersData.time > Date.now()) return printUsers(usersData.data);

  const response = await fetch("https://reqres.in/api/users?delay=3");
  const { data } = await response.json();

  printUsers(data);
  usersData = {
    data: data,
    time: Date.now() + 60000,
  };
  localStorage.setItem("users", JSON.stringify(usersData));
};

btnReadUsersElement.addEventListener("click", readUsers);
