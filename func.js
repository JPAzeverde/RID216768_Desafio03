let tasks = [];

window.onload = function() {
    const list = document.getElementById("todo-list");
    const formBtn = document.getElementById("form-btn");
    const nomeTarefaInput = document.getElementById("nomeTarefa");
    const nomeEtiquetaInput = document.getElementById("nomeEtiqueta");
    const contadorTarefa = document.getElementById("contadorTarefa");

    function updateTaskList() {
        list.innerHTML = "";
        tasks.forEach((task) => {
            const toDo = document.createElement('li');
        
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('task-info');
        
            const descSpan = document.createElement('span');
            descSpan.textContent = task.description;
        
            const metaDiv = document.createElement('div');
            metaDiv.classList.add('task-meta');
        
            const setorSpan = document.createElement('span');
            setorSpan.textContent = task.area;
            setorSpan.classList.add('task-area');
        
            const diaSpan = document.createElement('span');
            diaSpan.textContent = "Criado em " + task.data;
            diaSpan.classList.add('task-dia');
        
            metaDiv.appendChild(setorSpan);
            metaDiv.appendChild(diaSpan);
            infoDiv.appendChild(descSpan);
            infoDiv.appendChild(metaDiv);
        
            const actionDiv = document.createElement('div');
            actionDiv.classList.add('task-actions');
        
            const button = document.createElement('button');
            button.textContent = "Concluir";
            button.classList.add('task-btn');
            
            const checkedIcon = document.createElement('img');
            checkedIcon.src = "img/checked.svg";
            checkedIcon.alt = "Tarefa concluída";
            checkedIcon.classList.add('checked-icon');
            checkedIcon.style.display = task.checked ? "block" : "none";
        
            actionDiv.appendChild(button);
            actionDiv.appendChild(checkedIcon);
        
            if (task.checked) {
                descSpan.classList.add('task-done');
                button.style.display = "none";
            }
        
            button.addEventListener('click', () => {
                button.style.display = "none";
                checkedIcon.style.display = "block";
                descSpan.classList.add('task-done');
                task.checked = true;
                updateCompletedCount();
                reorderTasks();
                updateTaskList();
            });
        
            toDo.appendChild(infoDiv);
            toDo.appendChild(actionDiv);
            list.appendChild(toDo);
        });
        updateCompletedCount();
    }

    function reorderTasks() {
        tasks.sort((a, b) => {
            if (a.checked === b.checked) return 0;
            return a.checked ? 1 : -1;
        });
    }

    function updateCompletedCount() {
        const completedTasks = tasks.filter(task => task.checked).length;
        contadorTarefa.textContent = completedTasks;
    }

    updateTaskList();

    formBtn.addEventListener('click', function() {
        const nomeTarefa = nomeTarefaInput.value.trim();
        const nomeEtiqueta = nomeEtiquetaInput.value.trim();

        if (nomeTarefa && nomeEtiqueta) {
            const newTask = {
                id: tasks.length + 1,
                description: nomeTarefa,
                data: new Date().toLocaleDateString(),
                area: nomeEtiqueta,
                checked: false
            };

            tasks.unshift(newTask); // INSERE NO TOPO
            updateTaskList();

            nomeTarefaInput.value = '';
            nomeEtiquetaInput.value = '';
        } else {
            alert("Por favor, preencha ambos os campos.");
        }
    });
}
