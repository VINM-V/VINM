// Configuration
const API_ENDPOINT = 'https://vinm-plagiarism-detection.onrender.com/api/check-plagiarism';
const API_KEY = 'apikey01'; // Replace with your actual API key
// UI Elements
const textArea = document.getElementById('text-input');
const languageSelect = document.getElementById('language-select');
const checkType = document.getElementById('check-type');
const resultsContainer = document.getElementById('results');
const detailedResults = document.getElementById('detailed-results');
const similarityScore = document.getElementById('similarity-score');


function checkPlagiarism() {
    const textToCheck = document.getElementById('text-input').value;
    const loadingElement = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');

    if (!textToCheck) {
        alert("Please enter some text to check for plagiarism.");
        return;
    }

    loadingElement.style.display = 'block';
    resultsDiv.innerHTML = '';

    fetch('https://vinm-plagiarism-detection.onrender.com/api/check-plagiarism', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textToCheck, api_key: API_KEY })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        loadingElement.style.display = 'none';
        data.forEach(item => {
            resultsDiv.innerHTML += `<p>Sentence: ${item.sentence}<br>URL: <a href="${item.url}" target="_blank">${item.url}</a><br>Score: ${item.score}</p>`;
        });
    })
    .catch(error => {
        loadingElement.style.display = 'none';
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}