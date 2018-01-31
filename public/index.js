
var save = function(newItem){
  var countryInfo = JSON.parse(localStorage.getItem('country-info')) || [];
  countryInfo.push(newItem);
  localStorage.setItem('country-info', JSON.stringify(countryInfo));
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateDropDown = function(countries){
  var selectOption = document.querySelector('#country-list');
  countries.forEach(function(country, index){
    var countryScript = document.createElement('option');
    countryScript.text = country.name;
    countryScript.value = index;
    selectOption.appendChild(countryScript);
  });
}

var requestComplete = function(){
  // console.log('working');
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropDown(countries);
  selectedCountry(countries);

}

var selectedCountry = function(countries){
  var selectedResult = document.getElementById('country-info');
  var viewCountriesDropDown = document.getElementById('country-list');

  viewCountriesDropDown.addEventListener('change', function () {
    // var flagImage = document.createElement('img');
    // var flagResult = document.getElementById('flag-image-result');
    // if (!flagImage.src) {
    //   flagResult.appendChild(flagImage);
    // }
    // var flagURL = countries[viewCountriesDropDown.value].flag;
    // flagImage.src = flagURL;
    //
    // console.log(flagImage.src);
    // flagResult.appendChild(flagImage);
    selectedResult.innerText = "Country: " + countries[viewCountriesDropDown.value].name + "<br>" +
    "Capital: " + countries[viewCountriesDropDown.value].capital + "<br>" +
    "Population: " + countries[viewCountriesDropDown.value].population + "<br>" +
    "Flag: " + countries[viewCountriesDropDown.value].flag;
  })
 save(selectedResult)
}

var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);
  // var viewCountriesDropDown = document.getElementById('country-list');
  // viewCountriesDropDown.addEventListener('change', function () {
  //   // console.log(this.options[this.selectedIndex].text);
  //   selectedResult.innerHTML = "Country: " + this.countries.capital;
  //   // selectedResult.innerHTML = "Population: " + this.options[this.selectedIndex].text;
  //   // selectedResult.innerHTML = "Country: " + this.options[this.selectedIndex].text;
  //   // selectedResult.innerHTML = "Country: " + this.options[this.selectedIndex].text;
  // })
}

window.addEventListener('load', app);
