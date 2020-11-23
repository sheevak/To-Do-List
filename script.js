
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
    tasks: []
  };

  lists.push(newlist);
  console.log(lists);
  refreshList();

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

};

function switchPage () {
  const homePage = document.getElementById("homePage");
  const listPage = document.getElementById("listPage");
  homePage.classList.toggle("hidden");
  listPage.classList.toggle("hidden");
}

function editPage (index) {
  switchPage()

  document.getElementById("listhead").style.background = lists[index]["listColour"];
  document.getElementById("listtitle").innerHTML = lists[index]["listName"];

  let task = ``;

  for (let i = 0; i < lists[index]["tasks"].length; i++) {
    task += `<li>
              <button type="button" onclick="">
                <i class="far fa-square"></i>
              </button>
              <p>${lists[index]["tasks"][i]}</p>
              <i class="fas fa-trash"></i>
            </li>`
  };

  ultask.innerHTML = task;

}

const ullist = document.getElementById( "ullist" );
const ultask = document.getElementById("ultask");
const numberLists = document.getElementById( "numberList" );

let lists = [];
let counter = 0;
let counterTask = 0;
refreshList();
