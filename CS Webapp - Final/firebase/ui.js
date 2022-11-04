const todo = document.querySelector('.todo');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});

const renderTask = (data,id) => {

  const html = `
  <div id="tasks">

  <div class="task" data-id="${id}">
  <div class="content">
    <input 
      type="text" 
      class="text" 
      value="${data.goal}"
      readonly>
  </div>
  <div class="actions">
    <button class="delete" data-id="${id}">Done</button>
  </div>
</div> 
  `;

todo.innerHTML += html

};

//remove task
const removeTask = (id) => {
  const task = document.querySelector(`.task[data-id=${id}]`);
  task.remove();
}
