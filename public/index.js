

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateList = function(countries){
  var ul = document.querySelector('#country-list');
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  });
}

var requestComplete = function(){
  // console.log('working');
  if(this.status !== 200)
    return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);

}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  var viewCountriesButton = document.getElementById('view-countries')
  viewCountriesButton.addEventListener('click', function(){
    makeRequest(url, requestComplete);
  })
}

window.addEventListener('load', app);
