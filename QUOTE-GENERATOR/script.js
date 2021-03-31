const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader= document.getElementById('loader');



function showloadingspainner(){
loader.hidden=false;
quoteContainer.hidden=true;

}

// Hide Loading
function removeloadingspinner(){
  if(!loader.hidden){
    quoteContainer.hidden=false;
    loader.hidden=true;
  }
}

// get Quote From API
async function getQuote(){
  showloadingspainner();
const proxyUrl = 'https://cors.bridged.cc/'
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try{
const response = await fetch(proxyUrl + apiUrl);
const data = await response.json();
//IF author is blank, add 'Unknown'
if(data.quoteAuthor=== ''){
  authorText.innerText='Unknown';
}
else{
  authorText.innerText=data.quoteAuthor;
}
// Reduce font size for long quote
if(data.quoteText.length > 120){
  quoteText.classList.add('quote-long-text');
}
else{
  quoteText.classList.remove('quote-long-text');
}
quoteText.innerText = data.quoteText;
// Stop Loading, Show Quote
removeloadingspinner();

}catch(error){
  getQuote();
  
}
}

//twitter Quotes
function tweetQuote(){
  const quote=quoteText.innerText;
  const author=authorText.innerText;
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}
// Event listeners 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuote();
