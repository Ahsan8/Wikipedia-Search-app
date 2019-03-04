// selectors

const loading=document.querySelector('.loading');
const searchForm=document.getElementById('searchForm');
const output=document.querySelector('.output');
const search=document.getElementById('search');
const feedback=document.querySelector('.feedback');

const base="https://en.wikipedia.org/w/api.php";
const url="?action=query&format=json&origin=*&list=search&srsearch=";


// Event listener for submit event

searchForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const value=search.value;

    // check if search is empty

    if (value==="") {

    showFeedback('Please enter valid value!')
    
   } else {

    // gives search

    search.value="";

    // ajax

    ajaxWiki(value);
    
}
    
});


// feedback function

function showFeedback(text){

    feedback.classList.add('showItem');
    feedback.innerHTML=`<p> ${text} </p>`;
    setTimeout(()=> feedback.classList.remove('showItem'), 2000);

};


// ajaxwiki function

function ajaxWiki(search) {
    
    output.innerHTML="";
    loading.classList.add('showItem');
    // console.log(search);
    
    // urls
    const wikiURL=`${base}${url}${search}`;

    // http request

    fetch(wikiURL).then(response => response.json())
    .then(response => displayData(response))
    .catch(error => console.log(error));
    
};

function displayData(response) {

  loading.classList.remove('showItem');
  console.log(response);
  const {search:results}=response.query;

  let info='';
  results.forEach(result => {

    const pageId='http://en.wikipedia.org/?curid='

    const {title, snippet, pageid:link}=result;
    info+=`<div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
    <div class="card card-body">
     <h1 class="card-title blueText">${title}</h1>
     <p>${snippet}</p>
     <a href="${pageId}${link}" target="_blank" class="my-2 text-capitalize">read more...</a>

    </div>

   </div>`
      
  });
  
  output.innerHTML=info;
    
};