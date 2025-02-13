const tableBody = document.getElementById('tableBody');
const pageSizeSelect = document.getElementById('pageSize');
const paginationDiv = document.getElementById('pagination');
const idHeader = document.getElementById('idHeader');
const firstNameHeader = document.getElementById('firstNameHeader');
const lastNameHeader = document.getElementById('lastNameHeader');
const heightHeader = document.getElementById('heightHeader');
const ageHeader = document.getElementById('ageHeader');

let currentPage = 1;
let itemsPerPage = 10;
let sortField = 'id';
let isAscending = true;


pageSizeSelect.addEventListener('change', handlePageSize);
idHeader.addEventListener('click', function() { sortData('id'); });
firstNameHeader.addEventListener('click', function() { sortData('firstName'); });
lastNameHeader.addEventListener('click', function() { sortData('lastName'); });
heightHeader.addEventListener('click', function() { sortData('height'); });
ageHeader.addEventListener('click', function() { sortData('age'); });

function handlePageSize() {
  itemsPerPage = Number(pageSizeSelect.value);
  currentPage = 1;
  updateTable();
}

function sortData(field) {
  if (sortField === field) {
    isAscending = !isAscending;
  } else {
    sortField = field;
    isAscending = true;
  }
  updateTable();
}

function updateTable() {

  tableBody.innerHTML = '';

  const sortedData = people.slice().sort(function(a, b) {
    if (a[sortField] > b[sortField]) return isAscending ? 1 : -1;
    if (a[sortField] < b[sortField]) return isAscending ? -1 : 1;
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  for (let i = 0; i < currentData.length; i++) {
    const person = currentData[i];
    const row = document.createElement('tr');
    
    const idCell = document.createElement('td');
    idCell.textContent = person.id;
    
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = person.firstName;
    
    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = person.lastName;
    
    const heightCell = document.createElement('td');
    heightCell.textContent = person.height;
    
    const ageCell = document.createElement('td');
    ageCell.textContent = person.age;

    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(heightCell);
    row.appendChild(ageCell);
    
    tableBody.appendChild(row);
  }

  updatePagination(sortedData.length);
}

function updatePagination(totalItems) {
  paginationDiv.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', function() {
    currentPage--;
    updateTable();
  });
  paginationDiv.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    
    pageButton.addEventListener('click', function() {
      currentPage = i;
      updateTable();
    });
    
    paginationDiv.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', function() {
    currentPage++;
    updateTable();
  });
  paginationDiv.appendChild(nextButton);
}

updateTable();