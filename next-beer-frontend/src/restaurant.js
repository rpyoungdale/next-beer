class Restaurant {
  constructor(json) {
    this.id = json.id
    this.name = json.name
    this.address = json.address
    this.logo = json.logo
    this.beers = this.attachBeers(json.beers)
    Restaurant.all.push(this)
  }

  attachBeers(json) {
    let beerArray = []
    if(Beer.all.length){
      Beer.all.forEach(beer => {
        json.forEach(jsonBeer => {
          // debugger
          if(jsonBeer.id == beer.id) {
            beerArray.push(beer)
          }
        })
      })
    } else {
      json.forEach(jsonBeer => beerArray.push(new Beer(jsonBeer)))
    }
    return beerArray;
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




Restaurant.all = [];
