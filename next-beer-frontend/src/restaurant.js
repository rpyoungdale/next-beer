class Restaurant {
  constructor(json) {
    this.id = json.id
    this.name = json.name
    this.address = json.address
    this.logo = json.logo
    this.beers = attachBeers(json.beers)
    Restaurant.all.push(this)
  }

  static render() {
    let restaurantDropDownArea = document.getElementById('restaurants')
    // debugger
    let restaurantOptions = Restaurant.all.map(restaurant => {
      return `<div class="item" name="${restaurant.name}" data-id="${restaurant.id}">${restaurant.name}</div>`
      // return `<option class="item" name="${restaurant.name}" data-id="${restaurant.id}">${restaurant.name}</option>`
    })
    restaurantDropDownArea.innerHTML = restaurantOptions.join('')
  }


}

function attachBeers(json) {
  let beerArray = [];
  json.forEach(jsonBeer => {
    if(Beer.all.length){
      Beer.all.forEach(beer => {
        if(beer.id === jsonBeer.id) {
          beerArray.push(beer)
        }
      })
    }
  })
  return beerArray;
}


Restaurant.all = [];
