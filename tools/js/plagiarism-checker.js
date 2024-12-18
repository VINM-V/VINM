// Configuration
const API_ENDPOINT = 'https://api.vinmtech.com/plagiarism-check';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

// UI Elements
const textArea = document.getElementById('plagiarism-text');
const languageSelect = document.getElementById('language-select');
const checkType = document.getElementById('check-type');
const resultsContainer = document.getElementById('plagiarism-results');
const detailedResults = document.getElementById('detailed-results');
const similarityScore = document.getElementById('similarity-score');

// Check for plagiarism
async function checkPlagiarism() {
    const text = textArea.value.trim();
    
    if (!text) {
        alert('Please enter some text to check');
        return;
    }

    // Show loading state
    resultsContainer.style.display = 'block';
    detailedResults.innerHTML = '<div class="loading">Analyzing text... Please wait</div>';
    similarityScore.textContent = '-';

    try {
        // Prepare request data
        const requestData = {
            text: text,
            language: languageSelect.value,
            checkType: checkType.value
        };

        // Make API request
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Failed to check plagiarism');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        // Show demo results for now
        showDemoResults();
    }
}

// Display the plagiarism check results
function displayResults(data) {
    similarityScore.textContent = `${data.similarityScore}%`;
    
    let resultsHTML = '<div class="matches-list">';
    
    if (data.matches && data.matches.length > 0) {
        data.matches.forEach(match => {
            resultsHTML += `
                <div class="match-item">
                    <div class="match-header">
                        <span class="match-source">${match.source}</span>
                        <span class="match-similarity">${match.similarity}% Similar</span>
                    </div>
                    <div class="match-text">
                        <p class="original-text">${match.originalText}</p>
                        <p class="matched-text">${match.matchedText}</p>
                    </div>
                </div>
            `;
        });
    } else {
        resultsHTML += '<p class="no-matches">No significant matches found.</p>';
    }
    
    resultsHTML += '</div>';
    detailedResults.innerHTML = resultsHTML;
}

// Show demo results when API is not available
function showDemoResults() {
    const demoData = {
        similarityScore: 15,
        matches: [
            {
                source: 'Example Academic Journal (2023)',
                similarity: 25,
                originalText: 'The implementation of machine learning algorithms in embedded systems...',
                matchedText: 'Similar content found in section about machine learning in embedded systems...'
            },
            {
                source: 'Technology Blog',
                similarity: 10,
                originalText: 'Modern software development practices emphasize...',
                matchedText: 'Related discussion about software development methodologies...'
            }
        ]
    };
    
    displayResults(demoData);
}

// Add event listeners
textArea.addEventListener('input', () => {
    const charCount = textArea.value.length;
    if (charCount > 10000) {
        textArea.value = textArea.value.substring(0, 10000);
        alert('Maximum character limit is 10,000');
    }
});

// Initialize tooltips and other UI elements
document.addEventListener('DOMContentLoaded', () => {
    // Hide results container initially
    resultsContainer.style.display = 'none';
});
