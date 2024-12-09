document.addEventListener("DOMContentLoaded", function() {
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const showAllBtn = document.getElementById('show-all-btn');
  const showPendingBtn = document.getElementById('show-pending-btn');
  const showCompletedBtn = document.getElementById('show-completed-btn');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to render tasks
  function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });

    filteredTasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('list-group-item', 'task-item');
      taskItem.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="btn btn-success btn-sm complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      `;

      // Add complete button functionality
      taskItem.querySelector('.complete-btn').addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      // Add delete button functionality
      taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(taskItem);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Event listener for adding a new task
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      taskInput.value = '';
      renderTasks();
    }
  });

  // Filter buttons
  showAllBtn.addEventListener('click', () => renderTasks('all'));
  showPendingBtn.addEventListener('click', () => renderTasks('pending'));
  showCompletedBtn.addEventListener('click', () => renderTasks('completed'));

  // Initial render
  renderTasks();
});