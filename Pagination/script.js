const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1; // Current page number

function getData(page) {
  // Retrieve data from backend based on page number and items per page
  // Display data on page
  const dataDiv = document.getElementById('data');
  dataDiv.innerHTML = `Displaying data for page ${page}.`;
}

function createPaginationButtons(numPages) {
  // Create pagination buttons based on number of pages
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', function() {
      currentPage = i;
      getData(currentPage);
      setActiveButton();
    });
    paginationDiv.appendChild(button);
  }

  setActiveButton();
}

function setActiveButton() {
  // Set the active pagination button based on current page
  const buttons = document.querySelectorAll('#pagination button');

  buttons.forEach(button => {
    if (parseInt(button.innerText) === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Example usage:
const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20'];

const numPages = Math.ceil(data.length / itemsPerPage);
createPaginationButtons(numPages);
getData(currentPage);
