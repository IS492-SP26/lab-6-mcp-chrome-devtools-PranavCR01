let taskCounter = 0;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Event listeners

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert('Please enter a task!');
        return;
    }

    taskCounter++;

    const task = {
        id: taskCounter,
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleTimeString()
    };

    const taskItem = createTaskElement(task);

    // Remove empty message if it exists
    const emptyMsg = taskList.querySelector('.empty-message');
    if (emptyMsg) {
        emptyMsg.remove();
    }

    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus();

    console.log('Task added:', task);
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.dataset.id = task.id;

    const content = document.createElement('div');
    content.className = 'task-content';

    const taskText = document.createElement('div');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const taskTime = document.createElement('div');
    taskTime.className = 'task-time';
    taskTime.textContent = `Added at ${task.createdAt}`;

    content.appendChild(taskText);
    content.appendChild(taskTime);

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-small btn-complete';
    completeBtn.textContent = 'Done';
    completeBtn.addEventListener('click', () => {
        div.classList.toggle('completed');
        task.completed = !task.completed;
        console.log('Task toggled:', task);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-small btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        div.remove();
        console.log('Task deleted:', task);

        // Show empty message if no tasks left
        if (taskList.children.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = 'No tasks yet. Add one to get started!';
            taskList.appendChild(emptyMsg);
        }
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(content);
    div.appendChild(actions);

    return div;
}

// Log that the app has loaded
console.log('Task Tracker Pro loaded successfully!');
