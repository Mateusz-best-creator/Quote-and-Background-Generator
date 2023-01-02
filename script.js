const buttonNextQuote = document.querySelector('#new-quote');
const textField = document.querySelector("#text-content");
const AuthorField = document.querySelector("#author-name");

// Styling color of the background and buttons
const quoteSpecialSign = document.querySelector('.fa-quote-left');
const body = document.querySelector('#body-container');
const twitterButton = document.querySelector('#tweet-quote2');
const tumbltButton = document.querySelector('#tumblr');

let apiQuotes = [];

const array = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
const get2RandomColors_AddColors = function () {
    color1 = '#';
    color2 = '#';
    for (let i = 0; i < 6; i++) {
        color1 += array[Math.floor(Math.random() * array.length)];
        color2 += array[Math.floor(Math.random() * array.length)];
    }

    body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    quoteSpecialSign.style.color = color2;
    twitterButton.style.background = color1;
    tumbltButton.style.background = color1;
    buttonNextQuote.style.background = color2;
}

const getQuote = function () {
    console.log(buttonNextQuote, twitterButton);
    let randomIndex = Math.floor(Math.random() * apiQuotes.length);
    let quote = apiQuotes[randomIndex];
    if (quote.text.length > 100) {
        textField.classList.remove('small-quote');
        textField.classList.add('large-quote');
    } else {
        textField.classList.remove('large-quote');
        textField.classList.add('small-quote');
    }
    textField.textContent = quote.text;
    AuthorField.textContent = quote.author;

    get2RandomColors_AddColors();
}

const getQuotes = async function () {
    const response = await fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json");
    apiQuotes = await response.json();
    getQuote();
}

const tweetQuote = function () {
    const twitterurl = `https://twitter.com/intent/tweet?text=${textField.textContent} - ${AuthorField.textContent}`;
    window.open(twitterurl, '_blank');
}

// Button listeners
buttonNextQuote.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load 
getQuotes();