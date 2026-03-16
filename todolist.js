document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const saveBtn = document.getElementById('save-btn');

    addTaskBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    saveBtn.addEventListener('click', saveTasksToFile);

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        todoInput.value = '';
        todoInput.focus();
    }

    function saveTasksToFile() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const isCompleted = li.classList.contains('completed');
            tasks.push(`[${isCompleted ? 'x' : ' '}] ${taskText}`);
        });

        if (tasks.length === 0) {
            alert('No tasks to save.');
            return;
        }

        const fileContent = tasks.join('\n');
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'todolist.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
