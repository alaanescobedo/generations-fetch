class View { 
  render(data){
    const markup = this.generateMarkup(data);
    this._clear();
    this._parentElement.appendChild(markup)
  }
  renderSpinner(){
    this._clear();
    const spinner = document.createElement("div");
    spinner.innerHTML = `
      <div class="text-center">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
    this._parentElement.appendChild(spinner);
  }
  _clear(){
    this._parentElement.innerHTML = "";
  }
}

class TableUsers extends View {
  constructor(selector){
    super();
    this._parentElement = document.querySelector(selector);
  }
  generateMarkup(data){
    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    
    table.classList.add("table", "table-bordered","text-white","text-center","table-dark","table-responsive");	
    tableBody.classList.add("align-middle");
  
    tableHead.innerHTML = `
      <tr class="text-center">
        <th scope="col">id</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">e-mail</th>
        <th scope="col">Image</th>
      </tr>
    `;
    data.forEach((user) => tableBody.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.email}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td><img src="${user.avatar}" alt="avatar" class="rounded-circle w-25"  /></td>
      </tr>
    `);
  
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    return table
  }
}
export const tableView = new TableUsers("#users-info");
