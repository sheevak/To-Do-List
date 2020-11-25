
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
    tasks: [],
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
    li += `<li style="background-color: #${lists[i]['listColour'] }">
            <button type="button" class="list-btn" onclick="editPage(${i})">
            ${lists[i]['listName']}
            </button>
            <button type="button" class="delete-list" onclick="deleteList(${lists[i]['listId']})">
            <i class="far fa-trash-alt"></i>
            </button>
          </li> `;
  };
listName
  ullist.innerHTML = li;

  if ( lists.length == 1 ) {
    numberLists.innerHTML = `${ lists.length } List`;
  } else {
    numberLists.innerHTML = `${ lists.length } Lists`;
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
  document.getElementById("listtitle").innerHTML = lists[ind]["listName"];
  let task = ``;
  let sq;

  for (let i = 0; i < lists[ind]["tasks"].length; i++) {
    if (lists[ind]["completed"][i] == "no") {
      sq = `<i class="far fa-square"></i>`;
      tex = `<p>${lists[ind]["tasks"][i]}</p>`;
    } else {
      sq = `<i class="far fa-check-square"></i>`;
      tex = `<p style="text-decoration: line-through">${lists[ind]["tasks"][i]}</p>`;
    }

    task += `<li>
              <button type="button" onclick="toggle(${i})">
                ${sq}
              </button>
              ${tex}
              <button type="button" onclick="deleteTask(${i})">
                <i class="far fa-trash"></i>
              </button>
            </li>`
  };

  ultask.innerHTML = task;

  localStorage.setItem('ToDoLists', JSON.stringify(lists))

}

function addTask (form) {
  let newTask = form.taskName.value;

  lists[ind]["tasks"].push(newTask);
  lists[ind]["completed"].push("no");
  refreshPage()
  document.getElementById('taskName').value = "";
}

function toggle (j) {
  if (lists[ind]["completed"][j] == "no") {
    lists[ind]["completed"][j] = "yes"
  } else {
    lists[ind]["completed"][j] = "no";
  }
  refreshPage()
}

function deleteTask (i) {
  lists[ind]["tasks"].splice(i,1);
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

const ullist = document.getElementById( "ullist" );
const ultask = document.getElementById("ultask");
const numberLists = document.getElementById( "numberList" );
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
