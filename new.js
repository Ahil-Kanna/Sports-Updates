function getflags(code){
    let url = "https://restcountries.eu/rest/v2/alpha/"+code;
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data.flag);
      }).catch(err => {
        // Do something for an error here
      });
}
let url = "https://restcountries.eu/rest/v2/alpha/ind";
fetch(url).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    console.log(data.flag);
  }).catch(err => {
    // Do something for an error here
  });

  