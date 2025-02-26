

// // Array for random background colors
// const colors = ['#f1f8e9', '#e0f7fa', '#ffe0b2', '#d1c4e9', '#c8e6c9', '#ffccbc', '#ffeb3b', '#b3e5fc', '#ffccbc', '#dcedc8'];

// // Function to generate a unique ID for tasks
// function generateId() {
//     return 'id' + Date.now();
// }

// // Function to show validation/success messages
// function showMessage(message, color) {
//     let messageContainer = document.getElementById('messageContainer');

//     if (!messageContainer) {
//         messageContainer = document.createElement('div');
//         messageContainer.id = 'messageContainer';
//         messageContainer.style.textAlign = 'center';
//         messageContainer.style.fontSize = '16px';
//         messageContainer.style.margin = '10px';
//         document.querySelector('main').prepend(messageContainer);
//     }

//     messageContainer.style.color = color;
//     messageContainer.textContent = message;

//     // Remove message after 3 seconds
//     setTimeout(() => {
//         messageContainer.textContent = '';
//     }, 3000);
// }

// // Function to clear input fields
// function clearInputFields() {
//     document.getElementById('taskDescription').value = '';
//     document.getElementById('assignedTo').value = '';
//     document.getElementById('assignedDate').value = '';
//     document.getElementById('assignedBy').value = '';
//     document.getElementById('dueDate').value = '';
//     document.getElementById('priority').value = 'medium';
// }

// // Function to fetch all tasks
// async function fetchTasks() {
//     const response = await fetch('/api/tasks');
//     const tasks = await response.json();
//     displayTasks(tasks);
// }

// // Function to add a new task
// async function addTask() {
//     const taskDescription = document.getElementById('taskDescription').value.trim();
//     const assignedTo = document.getElementById('assignedTo').value.trim();
//     const assignedDate = document.getElementById('assignedDate').value;
//     const assignedBy = document.getElementById('assignedBy').value.trim();
//     const dueDate = document.getElementById('dueDate').value;

//     // Validate required fields
//     if (!taskDescription || !assignedTo || !assignedDate || !assignedBy || !dueDate) {
//         showMessage('Please fill in all required fields!', 'red');
//         return;
//     }

//     const task = {
//         id: generateId(),
//         description: taskDescription,
//         assignedTo: assignedTo,
//         assignedDate: assignedDate,
//         assignedBy: assignedBy,
//         dueDate: dueDate,
//         priority: document.getElementById('priority').value,
//         status: 'pending'
//     };

//     const response = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(task)
//     });

//     if (response.ok) {
//         fetchTasks();
//         clearInputFields();
//         showMessage('Task added successfully!', 'green');
//     }
// }

// // Function to edit a task
// async function editTask(id) {
//     const response = await fetch('/api/tasks');
//     const tasks = await response.json();
//     const task = tasks.find(task => task.id === id);

//     if (task) {
//         const newDescription = prompt('Edit Task Description:', task.description);
//         if (newDescription !== null && newDescription.trim() !== '') {
//             task.description = newDescription.trim();
//             task.assignedTo = prompt('Edit Assigned To:', task.assignedTo) || task.assignedTo;
//             task.assignedDate = prompt('Edit Assigned Date:', task.assignedDate) || task.assignedDate;
//             task.assignedBy = prompt('Edit Assigned By:', task.assignedBy) || task.assignedBy;
//             task.dueDate = prompt('Edit Due Date:', task.dueDate) || task.dueDate;
//             task.priority = prompt('Edit Priority (high/medium/low):', task.priority) || task.priority;

//             await fetch(`/api/tasks/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(task)
//             });

//             fetchTasks();
//             showMessage('Task edited successfully!', 'green');
//         }
//     }
// }

// // Function to delete a task
// async function deleteTask(id) {
//     await fetch(`/api/tasks/${id}`, {
//         method: 'DELETE'
//     });
//     fetchTasks();
//     showMessage('Task deleted successfully!', 'green');
// }

// // Function to display tasks fetched from the server
// function displayTasks(tasks) {
//     const taskList = document.getElementById('taskList');
//     taskList.innerHTML = '';

//     tasks.forEach((task, index) => {
//         const li = document.createElement('li');
//         li.className = 'task-item';
//         li.style.backgroundColor = colors[index % colors.length];

//         const taskText = document.createElement('span');
//         taskText.className = 'task-text';
//         taskText.textContent = task.description;

//         const taskDetails = document.createElement('div');
//         taskDetails.className = 'task-details';
//         taskDetails.innerHTML = `
//             <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
//             <p><strong>Assigned Date:</strong> ${task.assignedDate}</p>
//             <p><strong>Assigned By:</strong> ${task.assignedBy}</p>
//             <p><strong>Due Date:</strong> ${task.dueDate}</p>
//             <p><strong>Priority:</strong> ${task.priority}</p>
//             <p><strong>Status:</strong> ${task.status}</p>
//         `;

//         const taskButtons = document.createElement('div');
//         taskButtons.className = 'task-buttons';

//         const editButton = document.createElement('button');
//         editButton.className = 'edit-btn edit';
//         editButton.textContent = 'Edit';
//         editButton.onclick = () => editTask(task.id);

//         const deleteButton = document.createElement('button');
//         deleteButton.className = 'delete-btn delete';
//         deleteButton.textContent = 'Delete';
//         deleteButton.onclick = () => deleteTask(task.id);

//         taskButtons.appendChild(editButton);
//         taskButtons.appendChild(deleteButton);

//         li.appendChild(taskText);
//         li.appendChild(taskDetails);
//         li.appendChild(taskButtons);

//         taskList.appendChild(li);
//     });
// }

// // Function to filter tasks based on user input
// async function filterTasks() {
//     const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
//     const response = await fetch('/api/tasks');
//     const tasks = await response.json();

//     if (searchText === '') {
//         displayTasks(tasks);
//         return;
//     }

//     const filteredTasks = tasks.filter(task =>
//         task.description.toLowerCase().includes(searchText) ||
//         task.assignedTo.toLowerCase().includes(searchText) ||
//         task.assignedBy.toLowerCase().includes(searchText) ||
//         task.priority.toLowerCase().includes(searchText) ||
//         task.status.toLowerCase().includes(searchText)
//     );

//     displayTasks(filteredTasks);
// }

// // Function to clear all tasks
// function clearTasks() {
//     if (confirm('Are you sure you want to clear all tasks?')) {
//         fetch('/api/tasks', {
//             method: 'DELETE'
//         }).then(response => {
//             if (response.ok) {
//                 fetchTasks();
//                 showMessage('All tasks cleared!', 'green');
//             } else {
//                 showMessage('Failed to clear tasks', 'red');
//             }
//         });
//     }
// }

// // Navigation functions
// function showAddTaskSection() {
//     document.getElementById('addTaskSection').style.display = 'block';
//     document.getElementById('searchTaskSection').style.display = 'none';
// }

// function showSearchTaskSection() {
//     document.getElementById('addTaskSection').style.display = 'none';
//     document.getElementById('searchTaskSection').style.display = 'block';
// }

// // Initialize Task Manager
// function initTaskManager() {
//     fetchTasks();
//     document.getElementById('addTaskBtn').addEventListener('click', addTask);
//     document.getElementById('searchInput').addEventListener('input', filterTasks);
//     document.getElementById('clearTasksBtn').addEventListener('click', clearTasks);
//     document.getElementById('addTaskNav').addEventListener('click', showAddTaskSection);
//     document.getElementById('searchTaskNav').addEventListener('click', showSearchTaskSection);
// }

// document.addEventListener('DOMContentLoaded', initTaskManager);


// Array for random background colors
const colors = ['#f1f8e9', '#e0f7fa', '#ffe0b2', '#d1c4e9', '#c8e6c9', '#ffccbc', '#ffeb3b', '#ffccbc', '#dcedc8'];

// Function to generate a unique ID for tasks
function generateId() {
    return 'id' + Date.now();
}

// Function to show validation/success messages at the top center
function showMessage(message, type) {
    let messageContainer = document.getElementById('messageContainer');

    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        document.body.prepend(messageContainer); // Append to body at the top
    }

    messageContainer.textContent = message;
    messageContainer.className = type === 'success' ? 'success' : 'error';

    // Remove message after 3 seconds
    setTimeout(() => {
        messageContainer.textContent = '';
        messageContainer.className = '';
    }, 3000);
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById('taskDescription').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('assignedDate').value = '';
    document.getElementById('assignedBy').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('priority').value = 'medium';
}

// Function to fetch all tasks
async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    displayTasks(tasks);
}

// Function to add a new task
async function addTask() {
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const assignedTo = document.getElementById('assignedTo').value.trim();
    const assignedDate = document.getElementById('assignedDate').value;
    const assignedBy = document.getElementById('assignedBy').value.trim();
    const dueDate = document.getElementById('dueDate').value;

    // Validate required fields
    if (!taskDescription || !assignedTo || !assignedDate || !assignedBy || !dueDate) {
        showMessage('Please fill in all required fields!', 'error');
        return;
    }

    const task = {
        id: generateId(),
        description: taskDescription,
        assignedTo: assignedTo,
        assignedDate: assignedDate,
        assignedBy: assignedBy,
        dueDate: dueDate,
        priority: document.getElementById('priority').value,
        status: 'pending'
    };

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        fetchTasks();
        clearInputFields();
        showMessage('Task added successfully!', 'success');
    }
}

// Function to edit a task
async function editTask(id) {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const task = tasks.find(task => task.id === id);

    if (task) {
        const newDescription = prompt('Edit Task Description:', task.description);
        if (newDescription !== null && newDescription.trim() !== '') {
            task.description = newDescription.trim();
            task.assignedTo = prompt('Edit Assigned To:', task.assignedTo) || task.assignedTo;
            task.assignedDate = prompt('Edit Assigned Date:', task.assignedDate) || task.assignedDate;
            task.assignedBy = prompt('Edit Assigned By:', task.assignedBy) || task.assignedBy;
            task.dueDate = prompt('Edit Due Date:', task.dueDate) || task.dueDate;
            task.priority = prompt('Edit Priority (high/medium/low):', task.priority) || task.priority;

            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            fetchTasks();
            showMessage('Task edited successfully!', 'success');
        }
    }
}

// Function to delete a task (with confirmation)
async function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
        showMessage('Task deleted successfully!', 'success');
    }
}

// Function to display tasks fetched from the server
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.style.backgroundColor = colors[index % colors.length];

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.description;

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        taskDetails.innerHTML = `
            <p><strong>Assigned To:</strong> ${task.assignedTo}</p>
            <p><strong>Assigned Date:</strong> ${task.assignedDate}</p>
            <p><strong>Assigned By:</strong> ${task.assignedBy}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong> ${task.status}</p>
        `;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(taskDetails);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    });
}

// Function to filter tasks based on user input
async function filterTasks() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    if (searchText === '') {
        displayTasks(tasks);
        return;
    }

    const filteredTasks = tasks.filter(task =>
        task.description.toLowerCase().includes(searchText) ||
        task.assignedTo.toLowerCase().includes(searchText) ||
        task.assignedBy.toLowerCase().includes(searchText) ||
        task.priority.toLowerCase().includes(searchText) ||
        task.status.toLowerCase().includes(searchText)
    );

    displayTasks(filteredTasks);
}

// Function to clear all tasks (with confirmation)
function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        fetch('/api/tasks', {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                fetchTasks();
                showMessage('All tasks cleared!', 'success');
            } else {
                showMessage('Failed to clear tasks', 'error');
            }
        });
    }
}

// Navigation functions
function showAddTaskSection() {
    document.getElementById('addTaskSection').style.display = 'block';
    document.getElementById('searchTaskSection').style.display = 'none';
}

function showSearchTaskSection() {
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('searchTaskSection').style.display = 'block';
}

// Initialize Task Manager
function initTaskManager() {
    fetchTasks();
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('searchInput').addEventListener('input', filterTasks);
    document.getElementById('clearTasksBtn').addEventListener('click', clearTasks);
    document.getElementById('addTaskNav').addEventListener('click', showAddTaskSection);
    document.getElementById('searchTaskNav').addEventListener('click', showSearchTaskSection);
}

document.addEventListener('DOMContentLoaded', initTaskManager);
