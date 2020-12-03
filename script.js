
// Changes colour of icon in select element based on colour of option selected.


function col (shade) {
  document.getElementById("listColour").classList.add(shade);

}

// A function which adds new to do lists to home page
function addList (form) {

  counter += 1;

  const newlist = {
    listName: form.listName.value,
    listColour: form.listColour.value,
    listId: counter,
    items: [],
    completed: []
  };

  lists.push(newlist);
  refreshList();

  var frm = document.getElementsByName('listad')[0];
  frm.reset();  // Reset all form data
  document.getElementById("listColour").className = "fa";
};

function deleteList (num) {

  lists = lists.filter(te => {
    return te["listId"] != num
  });

  refreshList();
};

function refreshList () {
  let li = ``;

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

  if ( lists.length == 1 ) {
    numberList.innerHTML = `${ lists.length } List`;
  } else {
    numberList.innerHTML = `${ lists.length } Lists`;
  };

  localStorage.setItem('ToDoLists', JSON.stringify(lists))

};

function switchPage () {
  const homePage = document.getElementById("homePage");
  const listPage = document.getElementById("listPage");
  homePage.classList.toggle("hidden");
  listPage.classList.toggle("hidden");
}

function editPage (index) {
  ind = index;
  switchPage();
  refreshPage();
}

function refreshPage () {
  document.getElementById("listhead").style.background = `#${lists[ind]["listColour"]}`;
  document.getElementById("list-title").innerHTML = lists[ind]["listName"];
  document.getElementById("add-item").style.background = `#${lists[ind]["listColour"]}`;
  let item = ``;
  let sq;

  for (let i = 0; i < lists[ind]["items"].length; i++) {
    if (lists[ind]["completed"][i] == "no") {
      sq = `<i class="far fa-square"></i>`;
      tex = `<p class="item">${lists[ind]["items"][i]}</p>`;
    } else {
      sq = `<i class="far fa-check-square"></i>`;
      tex = `<p class="item" style="text-decoration: line-through">${lists[ind]["items"][i]}</p>`;
    }

    item += `<li class="item-entry">
              <button type="button" class="toggle-item" onclick="toggle(${i})">
                ${sq}
              </button>
              ${tex}
              <button type="button" class="delete-item" onclick="deleteItem(${i})">
                <i class="far fa-trash-alt"></i>
              </button>
            </li>`
  };

  savedItems.innerHTML = item;

  localStorage.setItem('ToDoLists', JSON.stringify(lists))

}

function addItem (form) {
  let newItem = form.itemName.value;

  lists[ind]["items"].push(newItem);
  lists[ind]["completed"].push("no");
  refreshPage()
  document.getElementById('itemName').value = "";
}

function toggle (j) {
  if (lists[ind]["completed"][j] == "no") {
    lists[ind]["completed"][j] = "yes"
  } else {
    lists[ind]["completed"][j] = "no";
  }
  refreshPage()
}

function deleteItem (i) {
  lists[ind]["items"].splice(i,1);
  lists[ind]["completed"].splice(i,1);
  refreshPage();
}

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
let lists, ind, counter;

if (data) {
  lists = JSON.parse(data);
  refreshList();
} else {
  lists = [];
}

counter = 0;


localStorage.setItem('ToDoLists', JSON.stringify(lists))
