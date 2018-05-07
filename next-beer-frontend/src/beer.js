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
      ${allBeerHTML}
    </div>`
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
}

Beer.all = [];
