// create Heading

let title = document.createElement('h1');
title.setAttribute('id', 'title');
title.innerText = "Pagination";
document.body.append(title);



let description = document.createElement('p');
description.setAttribute('id', 'description');
description.innerText = 'Pagination using DOM Manipulation';
document.body.append(description);

//create Container

let container = document.createElement("div")
container.classList.add("container", "table-responsive")

// Create Table

let table = document.createElement("table");
table.setAttribute('id', 'table');
table.classList.add("table")

// Create Table Head

let tableHead = document.createElement("thead")
tableHead.classList.add("bg-dark", "text-light")

// Create Table Row Head

let tableRowHead = document.createElement("tr")

// Create Head One

let tableHeadOne = document.createElement("td")
tableHeadOne.innerHTML = "Serial No"

// Create Head Two

let tableHeadTwo = document.createElement("td")
tableHeadTwo.innerHTML = "Name"

// Create Head Third

let tableHeadThird = document.createElement("td")
tableHeadThird.innerHTML = "Email"

// Create Table Body

let tableBody = document.createElement("tbody")
tableBody.setAttribute("id", "table-body")

// Create Span

let span = document.createElement("span")
span.innerHTML = ""

// Create Pagination

let pagination = document.createElement("div")
pagination.setAttribute("id", "pagination")
pagination.classList.add("container", "buttons")

// append the all 

tableRowHead.append(tableHeadOne)
tableRowHead.append(tableHeadTwo)
tableRowHead.append(tableHeadThird)
tableHead.append(tableRowHead)

table.append(tableHead)
table.append(tableBody)
container.append(span)
container.append(table)

document.body.append(container)
document.body.append(pagination)

function createTableRow(id, name, email) {
  let tr = document.createElement("tr")
  let td1 = document.createElement("td")
  let td2 = document.createElement("td")
  let td3 = document.createElement("td")
  td1.innerHTML = id
  td2.innerHTML = name
  td3.innerHTML = email
  tr.append(td1)
  tr.append(td2)
  tr.append(td3)
  tableBody.append(tr)
}

//XMLHttpRequest in JSON format

let request = new XMLHttpRequest();
request.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
request.send();
request.onload = function () {
  let tabledata = JSON.parse(this.response);

  let setData = {
    "queryset": tabledata,
    "page": 1,
    "rows": 10,
    "window": 10
  }

  buildTable()

  function pagination(queryset, page, rows) {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;
    let trimedData = queryset.slice(trimStart, trimEnd)
    let pages = Math.ceil(tabledata.length / rows);
    return {
      "queryset": trimedData,
      "pages": pages
    }
  }

  // function for Pagination Button

  function pageButtons(pages) {
    let pageOne = document.getElementById("pagination")
    pageOne.innerHTML = ""
    let maxLeft = (setData.page - Math.floor(setData.window / 2));
    let maxRight = (setData.page + Math.floor(setData.window / 2));
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = setData.window
    }
    if (maxRight > pages) {
      maxLeft = pages - (setData.window - 1)
      maxRight = pages
      if (maxLeft < 1) {
        maxLeft = 1;

      }
    }
    for (let page = maxLeft; page <= maxRight; page++) {
      pageOne.innerHTML = pageOne.innerHTML + `<button value="${page}" class="page">${page}</button>`

    }
    if (setData.page !== 1) {
      pageOne.innerHTML = `<button value=${1} clapageOne="page"> First</button>` + pageOne.innerHTML
    }
    if (setData.page != pages) {
      pageOne.innerHTML += `<button value=${pages} class="page">Last</button>`
    }
    let paginationData = document.getElementById("pagination")
    paginationData.addEventListener("click", function (e) {
      document.getElementById("table-body").innerHTML = ""
      setData.page = Number(e.target.value)
      buildTable()
    })

  }

  // Build Table Function

  function buildTable() {
    let data = pagination(setData.queryset, setData.page, setData.rows)
    let array = data.queryset
    for (let i = 0; i < array.length; i++) {
      createTableRow(array[i].id, array[i].name, array[i].email);
    }
    pageButtons(data.pages)
  }
}



