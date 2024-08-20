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
    form.addEventListener('submit', function(event) {

        event.preventDefault(); // Empêche le rechargement de la page
        const taskText = taskInput.value.trim();//recupere et traite le texte de la tache

        //verifie si le texte n est pas vide et creer une tache
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = ''; // Réinitialise le champ de saisie
        }
    });

    // Filtrage des tâches
    //on parcour les boutons de filtre et on ajoute un evenement
    filters.forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function() {
            const filter = filterBtn.getAttribute('data-filter');  //permet de recuperer le filtre selectionne

            //on gere l etat des boutons de filtre
            filters.forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');


            Array.from(taskList.children).forEach(function(task) {
                //on test le filtre
                /*Si le filtre selectionne est all alors 
                        on affiche toutes les taches
                    sinon si le filtre selectionne est todo alors  on test
                        si la tache est done alors
                            on cache la tache
                        sinon
                            on affiche la tache
                sinon si le filtre est done alors on test
                    si la tache est marquee done
                        on affiche la tache
                    sinon 
                        on cache la tache

                */
                if (filter === 'all') {
                    task.style.display = '';
                } else if (filter === 'todo') {
                    if (task.classList.contains('done')) {
                        task.style.display = 'none';
                    } else {
                        task.style.display = '';
                    }
                } else if (filter === 'done') {
                    if (task.classList.contains('done')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                }
            });
        });
    });

})

