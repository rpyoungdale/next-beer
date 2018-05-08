// let beerId = 0;
class Beer {
  constructor(json) {
    this.id = json.id;
    this.image = json.image;
    this.name = json.name;
    this.beerType = json.beerType;
    this.abv = json.abv;
    this.ibu = json.ibu;
    this.likeCount = json.like_count;
    this.dislikeCount = json.dislike_count;
    this.comments = json.comments
    Beer.all.push(this);
  }

  static renderAll() {
    const allBeerHTML = Beer.all.map(beer => {
      return beer.render();
    }).join('')

    return `
    <div>
    <form id="new-beer-form" data-id="${this.id}">
      <p>Tried a new Beer Recently? Add it here!</p>
      <input type="text" id="name" placeholder="Name">
      <input type="text" id="abv" placeholder="ABV">
      <input type="text" id="ibu" placeholder="IBU">
      <input type="text" id="type" placeholder="Type of Beer(ex. Wheat)">
    </form>
    <button type="submit" value="Submit" form="new-beer-form">Add a New Favorite Beer!</button>
    </div>
    <div>
      ${allBeerHTML}
    </div>
    `
  }

  render() {
    return `
    <h1>${this.name}</h1>
    <img src="${this.image}" height="200">
    <ul>
      <li>Type: ${this.beerType}</li>
      <li>ABV: ${this.abv}</li>
      <li>IBU: ${this.ibu}</li>
      <li>Likes: ${this.likeCount}</li>
      <li>Dislikes: ${this.dislikeCount}</li>
    </ul>
    <form id="comment-form" data-id="${this.id}">
      <p>Tell us what you think!</p>
      <input type="text">
    </form>
    <button type="submit" value="Submit" form="comment-form">Submit</button>
    <h3>Comments</h3>
    <div id="comments">
    </div>
    `
  }

  save() {
    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: this.content,
        beer_id: this.beerId
      })
    })
  }

}

Beer.all = [];
