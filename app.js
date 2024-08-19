document.addEventListener('DOMContentLoaded', function(){

    const form = document.querySelector('form');
    const taskInput = form.querySelector('input[name="title"]');
    const taskList = document.querySelector('ul.list-group');
    const filters = document.querySelectorAll('[data-filter]');

    // Fonction pour créer un élément de tâche
    function createTask(taskText) {

        //creation element <li> pour representer la tache
        const li = document.createElement('li');
        li.className = 'todo list-group-item d-flex align-items-center';

        //creation case a cocher <input> 
        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input';
        checkbox.type = 'checkbox';

        //creation du label (etiquette) <label> pour representer la tache
        const label = document.createElement('label');
        label.className = 'ms-2 form-check-label';
        label.textContent = taskText;

        //creation du bouton suppression avec une icone 
        const deleteBtn = document.createElement('label');
        deleteBtn.className = 'ms-auto btn btn-danger btn-sm';
        deleteBtn.innerHTML = '<i class="bi-trash"></i>';

        //on ajoute les elements crees aux <li> 
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        //on ajoute les elements crees aux <li>
        taskList.appendChild(li);

        // Événements pour la nouvelle tâche
        //changement etat de la case à cocher: Lorsque la case a coche est decoche, cet evenement change l etat de la tache 
        checkbox.addEventListener('change', function() {
            li.classList.toggle('done', checkbox.checked);
        });

        //Quand le bouton de suppression est clique cet evenement supprime l element <li> de la liste ('taskList')
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
        });
    }

    // Ajout de la tâche lors de la soumission du formulaire

    // Filtrage des tâches

})

