document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const taskInput = form.querySelector('input[name="title"]');
    const taskList = document.querySelector('.list-group');
    const filters = document.querySelectorAll('[data-filter]');

    let taskIdCounter = 0; // Compteur pour générer des IDs uniques

    // Fonction pour créer un élément de tâche
    function createTask(taskText) {
        taskIdCounter++; // Incrémenter le compteur pour chaque nouvelle tâche

        // Création de l'élément <li> pour représenter la tâche
        const li = document.createElement('li');
        li.className = 'todo list-group-item d-flex align-items-center';
        li.id = `task-${taskIdCounter}`; // Ajouter un ID unique à chaque <li>
        li.setAttribute('data-id', `task-${taskIdCounter}`); // Ajouter un attribut data-id pour le filtrage

        // Création de la case à cocher <input>
        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input';
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${taskIdCounter}`; // Ajouter un ID unique à chaque checkbox

        // Création du label <label> pour représenter la tâche
        const label = document.createElement('label');
        label.className = 'ms-2 form-check-label';
        label.textContent = taskText;
        label.setAttribute('for', checkbox.id); // Lier le label à la checkbox

        // Création du bouton de suppression
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'ms-auto btn btn-danger btn-sm';
        deleteBtn.innerHTML = '<i class="bi-trash"></i>';
        deleteBtn.setAttribute('aria-label', 'Supprimer la tâche'); // Accessibilité

        // Ajouter les éléments créés à l'élément <li>
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        // Ajouter l'élément <li> à la liste des tâches
        taskList.appendChild(li);

        // Événements pour la nouvelle tâche
        // Changement de l'état de la case à cocher
        checkbox.addEventListener('change', function() {
            li.classList.toggle('done', checkbox.checked);
            applyFilter(); // Appliquer le filtre après modification
        });

        // Suppression de la tâche lorsque le bouton est cliqué
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            applyFilter(); // Appliquer le filtre après suppression
        });
    }

    // Ajout de la tâche lors de la soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const taskText = taskInput.value.trim(); // Récupère et traite le texte de la tâche

        // Vérifie si le texte n'est pas vide et crée une tâche
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = ''; // Réinitialise le champ de saisie
        }
    });

    // Fonction pour appliquer le filtre actif
    function applyFilter() {
        // Récupérer le filtre actif
        const activeFilter = document.querySelector('.btn-group .btn.active');
        if (activeFilter) {
            const filterValue = activeFilter.getAttribute('data-filter');

            // Appliquer le filtre en fonction de la valeur du filtre actif
            Array.from(taskList.children).forEach(function(task) {
                if (filterValue === 'all') {
                    task.classList.remove('d-none'); // Afficher toutes les tâches
                } else if (filterValue === 'todo') {
                    task.classList.toggle('d-none', task.classList.contains('done')); // Masquer les tâches faites
                } else if (filterValue === 'done') {
                    task.classList.toggle('d-none', !task.classList.contains('done')); // Masquer les tâches non faites
                } else {
                    // Si le filtre est un ID spécifique, le comparer avec l'attribut data-id
                    task.classList.toggle('d-none', task.getAttribute('data-id') !== filterValue);
                }
            });
        } else {
            // Si aucun filtre actif n'est trouvé, afficher toutes les tâches
            Array.from(taskList.children).forEach(task => task.classList.remove('d-none'));
        }
    }

    // Filtrage des tâches
    filters.forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Met à jour l'état des boutons
            filters.forEach(function(btn) {
                btn.classList.remove('active');
            });
            filterBtn.classList.add('active');
            applyFilter();
        });
    });

    // Initialiser le filtre actif (affiche toutes les tâches par défaut)
    applyFilter();
});
