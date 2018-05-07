// const beerURLPrefix = 'http://localhost:3000/api/v1'

fetch(`http://localhost:3000/api/v1/beers`)
  .then(res => res.json())
  .then(json => console.log(json));
