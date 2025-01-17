document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTask');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeButtons = document.getElementsByClassName('close');
    const taskForm = document.getElementById('taskForm');
    const activitiesContainer = document.getElementById('activitiesContainer');
    const validationMessage = document.getElementById('validationMessage');
    const viewTaskModal = document.getElementById('viewTaskModal');
    let activities = [];

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('max', today);

    addTaskBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'block';
    });

    Array.from(closeButtons).forEach(button => {
        button.addEventListener('click', function() {
            addTaskModal.style.display = 'none';
            viewTaskModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
        if (event.target === viewTaskModal) {
            viewTaskModal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const startDate = document.getElementById('startDate').value;

        if (!taskName || !imageUrl || !startDate) {
            displayValidationMessage("No Activities added yet");
            return;
        }

        const activity = { name: taskName, image: imageUrl, date: startDate };
        activities.push(activity);
        displayActivities();
        taskForm.reset();
        addTaskModal.style.display = 'none';
    });

    function displayActivities() {
        activitiesContainer.innerHTML = '';
        if (activities.length === 0) {
            activitiesContainer.innerHTML = '<div class="no-activities">No activities added yet.</div>';
            return;
        }

        activities.forEach((activity, index) => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}">
                <div class="activity-info">
                    <h3>${activity.name}</h3>
                </div>
            `;
            
            activityCard.addEventListener('click', () => viewTask(index));
            
            activitiesContainer.appendChild(activityCard);
        });
    }

    window.viewTask = function(index) {
        const activity = activities[index];
        const taskDetails = document.getElementById('taskDetails');

        const startDate = new Date(activity.date);
        const currentDate = new Date();
        const timeDifference = currentDate - startDate;
        const daysTask = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        taskDetails.innerHTML = `
            <h3>${activity.name}</h3>
            <p>Started on: ${activity.date}</p>
            <p>Streak Days: ${daysTask} days</p>
            <img src="${activity.image}" alt="${activity.name}">
            <button class="delete-btn" onclick="deleteActivity(${index})">Delete</button>
        `;
        viewTaskModal.style.display = 'block';
    };

    window.deleteActivity = function(index) {
        activities.splice(index, 1);
        displayActivities();
        viewTaskModal.style.display = 'none';
    };

    function displayValidationMessage(msg) {
        validationMessage.innerText = msg;
        validationMessage.style.display = 'block';
        setTimeout(() => {
            validationMessage.style.display = 'none';
        }, 5000);
    }
});
