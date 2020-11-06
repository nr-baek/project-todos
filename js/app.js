// states
let dataOfEachMonth = [];
let todos = [];
 
// CalendarDOMs
let $thisMonth = document.querySelector('.this-month');
const $calendarMonths = document.querySelector('.calendar-months');
const $calendarDates = document.querySelector('.calendar-dates');

// TodosDOMs
const $todosList = document.querySelector('.todos-list');
const $todosInput = document.querySelector('.todos-input');

// Calendar functions
const fetchDataOfEachMonths = () => [
  { month: 1, startDay: 3, lastDate: 31 }, { month: 2, startDay: 6, lastDate: 29 },
  { month: 3, startDay: 0, lastDate: 31 }, { month: 4, startDay: 3, lastDate: 30 },
  { month: 5, startDay: 5, lastDate: 30 }, { month: 6, startDay: 1, lastDate: 30 },
  { month: 7, startDay: 3, lastDate: 31 }, { month: 8, startDay: 6, lastDate: 31 },
  { month: 9, startDay: 2, lastDate: 30 }, { month: 10, startDay: 4, lastDate: 31 },
  { month: 11, startDay: 0, lastDate: 30 }, { month: 12, startDay: 2, lastDate: 31 },
];
const getThisMonth = selected => {
  [...$calendarMonths.children].forEach(month => month === selected ? 
    month.classList.toggle('this-month', true) : month.classList.toggle('this-month', false));
}
const renderCalendar = () => {
  $thisMonth = document.querySelector('.this-month');
  const selectedMonth = dataOfEachMonth[+$thisMonth.textContent - 1];
  $calendarDates.innerHTML = '';
  for (let i = 0; i < selectedMonth.startDay; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-space');
    $calendarDates.appendChild($li);
  }
  for (let i = 1; i <= selectedMonth.lastDate; i++) {
    const $li = document.createElement('li');
    $li.classList.add('calendar-date');
    $li.appendChild(document.createTextNode(i + ''));
    $calendarDates.appendChild($li);
  }
};

// Todos function
const fetchTodos = () => {
  todos = [];

  listRender();
}
const listRender = () => {
  let html = '';
  todos.forEach(
    ({ id, content, completed }) => {
      html += `
        <li id="${id}" class="todo-item">
          <label><input type="checkbox" ${completed ? ' checked' : ''}><span>${content}</span></label>
          <i class="remove-todo fa fa-trash-o" aria-hidden="true"></i>
       </li>`;
    }
  );

  $todosList.innerHTML = html;
};
const maxId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const addTodosList = content => {
  todos = [...todos, {id: maxId(), content, completed: false}];

  listRender();
};

const removeTodosList = id => {
  todos = todos.filter(todo => todo.id !== +id);

  listRender();
};

const updateCompleted = target => {
  todos.forEach(todo => {
    if (todo.id === +target.parentNode.parentNode.id) todo.completed = !todo.completed;
  });
};

// CalendarEVENTS
document.addEventListener('DOMContentLoaded', () => {
  dataOfEachMonth = fetchDataOfEachMonths();
  console.log(dataOfEachMonth);
  renderCalendar();
});
$calendarMonths.onclick = e => {
  if (!e.target.classList.contains('month')) return;
  console.log(e.target);
  getThisMonth(e.target);
  renderCalendar();
};

// TodosEVENTS
window.onload = fetchTodos;

$todosInput.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.value) return;

  addTodosList($todosInput.value);
  $todosInput.value = '';
};
$todosList.onclick = e => {
  if (!e.target.matches('.todos-list .remove-todo')) return;
  console.log(e.target);
  removeTodosList(e.target.parentNode.id);
};
$todosList.onchange = e => {
  updateCompleted(e.target);
};