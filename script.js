
// A function which changes colour of icon in select element based on
// colour selected.
function col (shade) {
  document.getElementById("listColour").classList.add(shade);
}

// A function which adds new lists to the home page
function addList (form) {

  const newList = {
    listName: form.listName.value,
    listColour: form.listColour.value,
    items: [],
    completed: []
  };

  lists.push(newList);
  refreshList();

  // Resetting the form
  let listForm = document.getElementsByName('listForm')[0];
  listForm.reset();
  document.getElementById("listColour").className = "fa";
};

//This function refreshes the home page so it shows all the lists saved in the
// lists variable
function refreshList () {
  let li = ``;

  //creating an <li> element for each list in the lists variable
  for (let i = 0; i < lists.length; i++) {
    li += `<li class="list-entry" style="background-color: #${lists[i]['listColour'] }">
            <button type="button" class="list-btn" onclick="editPage(${i})">
            ${lists[i]['listName']}
            </button>
            <button type="button" class="delete-list" onclick="deleteList(${lists[i]['listId']})">
            <i class="far fa-trash-alt"></i>
            </button>
          </li> `;
  };

  savedLists.innerHTML = li;

  //updating the list counter based on the new number of lists
  if ( lists.length == 1 ) {
    numberList.innerHTML = `${ lists.length } List`;
  } else {
    numberList.innerHTML = `${ lists.length } Lists`;
  };

  localStorage.setItem('ToDoLists', JSON.stringify(lists))

};

// This function deletes a list
function deleteList (id) {

  // filters out the list with listId = passed id
  lists = lists.filter(i => {
    return i["listId"] != id
  });

  refreshList();
};

//This function toggles display property of the homePage and listPage divs to
// and from none
function switchPage () {
  const homePage = document.getElementById("homePage");
  const listPage = document.getElementById("listPage");
  homePage.classList.toggle("hidden");
  listPage.classList.toggle("hidden");
}

//This function refreshes the list page so it shows all the selected list's items
function refreshPage () {
  document.getElementById("listhead").style.background = `#${lists[ind]["listColour"]}`;
  document.getElementById("list-title").innerHTML = lists[ind]["listName"];
  document.getElementById("add-item").style.background = `#${lists[ind]["listColour"]}`;
  let item = ``;
  let check;

  for (let i = 0; i < lists[ind]["items"].length; i++) {
    if (lists[ind]["completed"][i] == "no") {
      check = `<i class="far fa-square"></i>`;
      itemNameElement = `<p class="item">${lists[ind]["items"][i]}</p>`;
    } else {
      check = `<i class="far fa-check-square"></i>`;
      itemNameElement = `<p class="item" style="text-decoration: line-through">${lists[ind]["items"][i]}</p>`;
    }

    item += `<li class="item-entry">
              <button type="button" class="toggle-item" onclick="toggle(${i})">
                ${check}
              </button>
              ${itemNameElement}
              <button type="button" class="delete-item" onclick="deleteItem(${i})">
                <i class="far fa-trash-alt"></i>
              </button>
            </li>`
  };

  savedItems.innerHTML = item;

  localStorage.setItem('ToDoLists', JSON.stringify(lists))

}

//This function calls the refreshPage and switchPage functions to change to the
// selected list page based on the index
function editPage (index) {
  ind = index;
  switchPage();
  refreshPage();
}

//This function adds a new item into the current list
function addItem (form) {
  let newItem = form.itemName.value;

  lists[ind]["items"].push(newItem);
  lists[ind]["completed"].push("no");
  refreshPage()
  document.getElementById('itemName').value = "";
}

//This fucntion toggles the value of completed between no and yes for each
//item in a list
function toggle (j) {
  if (lists[ind]["completed"][j] == "no") {
    lists[ind]["completed"][j] = "yes"
  } else {
    lists[ind]["completed"][j] = "no";
  }
  refreshPage()
}

//This function deletes the selected item
function deleteItem (i) {
  lists[ind]["items"].splice(i,1);
  lists[ind]["completed"].splice(i,1);
  refreshPage();
}

//This function clears the ToDoLists item from the local storage
function clearAll () {
  if (confirm("Are you sure you want to clear all the saved lists?")){
    localStorage.removeItem("ToDoLists");
    lists = [];
    refreshList();
  }

}

const savedLists = document.getElementById( "savedLists" );
const savedItems = document.getElementById("savedItems");
const numberList = document.getElementById( "numberList" );
let data = localStorage.getItem("ToDoLists");
let lists, ind;

//This if statement saves the data in the variable lists if it has any data else
// it saves lists as an empty array.
if (data) {
  lists = JSON.parse(data);
  refreshList();
} else {
  lists = [];
}


localStorage.setItem('ToDoLists', JSON.stringify(lists))
