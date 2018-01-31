var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateDropDown = function(countries){
  var selectOption = document.querySelector('#country-list');
  countries.forEach(function(country){
    var countryScript = document.createElement('option');
    countryScript.text = country.name;
    selectOption.appendChild(countryScript);
  });
}

var requestComplete = function(){
  // console.log('working');
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropDown(countries);

}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
  // var viewCountriesButton = document.getElementById('view-countries')
  // viewCountriesButton.addEventListener('change', function(){
  //   makeRequest(url, requestComplete);
  // })
  var viewCountriesDropDown = document.getElementById('country-list');
  viewCountriesDropDown.addEventListener('change', function () {

  })
}

window.addEventListener('load', app);
