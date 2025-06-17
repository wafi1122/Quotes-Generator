const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let currentQuote = null;

// Show/hide loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function showQuote() {
    loading();
    
    // Set author with fallback to "Unknown"
    authorText.textContent = currentQuote.author || "Unknown";
    
    // Set quote text (check both possible API fields)
    const quoteContent = currentQuote.quote || currentQuote.text;
    quoteText.textContent = quoteContent;
    
    // Handle long quotes styling
    if (quoteContent.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    complete();
}

async function getQuote() {
    loading();
    const apiUrl = 'https://dummyjson.com/quotes/random';
    try {
        const response = await fetch(apiUrl);
        currentQuote = await response.json();
        showQuote();
    } catch(error) {
        // Fallback if API fails
        currentQuote = {
            author: "Unknown",
            quote: "Failed to load quote. Please try again."
        };
        showQuote();
        console.error("Error fetching quote:", error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.textContent)} - ${encodeURIComponent(authorText.textContent)}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Initial load
getQuote();