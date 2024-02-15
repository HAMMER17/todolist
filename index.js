// Получаем елементы html
const form = document.querySelector('#form_container')
const input = document.querySelector('#input-box')
const task = document.querySelector('#task')
const empty = document.querySelector('.empty_list')

let allTasks = []
if (localStorage.getItem('tasks')) {
  allTasks = JSON.parse(localStorage.getItem('tasks'))
}
allTasks.forEach(element => {
  const classCss = element.done ? 'done' : 'p'
  //форма задачи
  const taskText = ` <li class='li' id='${element.id}'>
      <input type="checkbox" class="checkbox" data-action='done'>
    <p class=${classCss}>${element.text} </p>
    <button data-action='delete'>удалить</button>
</li>`
  //  Выводим список на страницу
  task.insertAdjacentHTML('beforeend', taskText)
});
showEmptyList()
//функция по выводу списка
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const text = input.value
  if (text === '') {
    alert('Напишите задание')
    return;
  };
  const newTask = {
    id: Date.now(),
    text,
    done: false
  }
  // добавляем задачи в масссив
  allTasks.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(allTasks))
  //формируем css 
  const classCss = newTask.done ? 'done' : 'p'
  //форма задачи
  const taskText = ` <li class='li' id='${newTask.id}'>
      <input type="checkbox" class="checkbox" data-action='done'>
    <p class=${classCss}>${newTask.text} </p>
    <button data-action='delete'>удалить</button>
</li>`
  //  Выводим список на страницу
  task.insertAdjacentHTML('beforeend', taskText)
  //очистить поле ввода и вернуть фокус
  input.value = ''
  input.focus()
  //убираем пустой список
  showEmptyList()
  // if (task.children.length > 0) {
  //   empty.classList.add('none')
  // }
});

//удаление задачи
task.addEventListener('click', function (e) {
  if (e.target.dataset.action !== 'delete') {
    return;
  }
  const parentNode = e.target.closest('li')
  //находим id
  const id = Number(parentNode.id)
  //находим id в массиве
  const elemId = allTasks.findIndex((index) => index.id === id)
  //или
  // const elemId = allTasks.filter((index) => index.id !== id)
  //удаляем из массива задачу
  allTasks.splice(elemId, 1)
  localStorage.setItem('tasks', JSON.stringify(allTasks))
  parentNode.remove()
  showEmptyList()
  // if (task.children.length === 0) {
  //   empty.classList.remove('none')
  // }

});
//выполнение задания отмечаем
task.addEventListener('click', function (e) {
  if (e.target.dataset.action !== 'done') return;
  const parentNode = e.target.closest('li')
  //получаем id
  const id = Number(parentNode.id)
  const tasks = allTasks.find((index) => index.id === id)
  //меняем false на true
  tasks.done = !tasks.done

  localStorage.setItem('tasks', JSON.stringify(allTasks))

  const p = parentNode.querySelector('.p')
  p.classList.toggle('done')
});

function showEmptyList() {
  if (allTasks.length === 0) {
    const emptyList = ` <div class="empty_list">
    <img src="/images/1.png" alt="todo" class="img">
    <h1>Ваш список пуст</h1>
  </div>`
    task.insertAdjacentHTML('afterbegin', emptyList)
  }
  if (allTasks.length > 0) {
    const emptyEl = document.querySelector('.empty_list')
    emptyEl ? emptyEl.remove() : null;
  }
}