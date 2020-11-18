
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
    listId: counter
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
}

function refreshList () {
  let li = ``;

  for (let i=0; i < lists.length; i++){
    li += `<li style="color: ${lists[i]['listColour']}">
          <p>${lists[i]['listName']}</p>
          <button type="button" class="icon-btn" onclick="deleteList(${lists[i]['listId']})">
          <i class="fas fa-trash"></i>
          </button>
          </li>`;
  }
  ul.innerHTML = li;
}

const ul = document.getElementById("ullist");


let lists = []
let counter = 0;
