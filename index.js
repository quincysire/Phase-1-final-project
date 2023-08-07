// Event listener for the calculation button
document.getElementById('calcButton').addEventListener("click", calculateValue);

// Function to calculate and display value advice
function calculateValue() {
    const itemValues = Array.from({ length: 6 }, (_, i) =>
        parseInt(document.getElementById(`item${i + 1}`).value)
    );
    const totalValue = itemValues.reduce((sum, value) => sum + value, 0);

    fetch('https://my-json-server.typicode.com/Quincy-Sire/Phase-1-final-project/advise')
        .then(response => response.json())
        .then(data => {
            let adviseIndex = data.findIndex(adviseData => totalValue >= adviseData.threshold);

            if (adviseIndex === -1) {
                adviseIndex = 5;
            }

            document.getElementById("totalValue").innerHTML = data[adviseIndex].givenAdvise;
        });
}

// Event listener for the comment submission
document.getElementById("submitButton").addEventListener('click', comment);

// Function to handle comment submission and display
function comment() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const commentText = document.getElementById('comment').value;

        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong>${name}</strong>: ${commentText}`;
        commentList.appendChild(newComment);

        // Event listener for deleting comments
        newComment.addEventListener('click', handleDelete);

        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    });
}

// Function to handle comment deletion
function handleDelete(e) {
    e.target.parentNode.removeChild(e.target);
}
