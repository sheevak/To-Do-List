
// Changes colour of icon in select element based on colour of option selected.
$('select').on('change', function(ev) {
    $(this).attr('class', 'fa').addClass($(this).children(':selected').val());
});

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
  console.log(lists);
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
    li += `<li>
            <button type="button" class="list-expand" style="color: ${lists[i]['listColour'] }" onclick="editPage(${i})">
            ${lists[i]['listName']}
            </button>
            <button type="button" class="icon-btn" onclick="deleteList(${lists[i]['listId']})">
            <i class="fas fa-trash"></i>
            </button>
          </li> `;
  };

  ullist.innerHTML = li;

  if ( lists.length == 1 ) {
    numberLists.innerHTML = `${ lists.length } List`;
  } else {
    numberLists.innerHTML = `${ lists.length } Lists`;
  };

  localStorage.setItem('key2', JSON.stringify(lists))

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
  document.getElementById("listhead").style.background = lists[ind]["listColour"];
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
                <i class="fas fa-trash"></i>
              </button>
            </li>`
  };

  ultask.innerHTML = task;

  localStorage.setItem('key2', JSON.stringify(lists))

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
  localStorage.removeItem("key2");
  lists = [];
  refreshList();
}

const ullist = document.getElementById( "ullist" );
const ultask = document.getElementById("ultask");
const numberLists = document.getElementById( "numberList" );
let data = localStorage.getItem("key2");
let lists, ind, counter;

if (data) {
  lists = JSON.parse(data);
  refreshList();
} else {
  lists = [];
}

counter = 0;


localStorage.setItem('key2', JSON.stringify(lists))
