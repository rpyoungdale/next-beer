class Beer {
  constructor(json) {
    this.id = json.id;
    // debugger;
    if(json.image){
      this.image = json.image
    } else {
      this.image =
      'http://meghansmith.github.io/conquestbrewing/images/beerBottle2.png'
    }

    this.name = json.name;
    this.beerType = json.beer_type;
    this.abv = json.abv;
    this.ibu = json.ibu;
    this.likeCount = json.like_count;
    this.dislikeCount = json.dislike_count;
    this.comments = json.comments
    Beer.all.push(this);
  }

  static renderAll(beers=Beer.all) {
    const allBeerHTML = beers.map(beer => {
      return beer.render();
    }).join('')

    return `
    <div>
    <form style="text-align:center" id="new-beer-form" data-id="${this.id}">
      <h3>Tried a new Beer Recently? Add it here!</h3>
      <input type="text" id="name" placeholder="Name">
      <input type="text" id="abv" placeholder="ABV">
      <input type="text" id="ibu" placeholder="IBU">
      <input type="text" id="type" placeholder="Type of Beer(ex. Wheat)">
      <input type="submit" value="Add a New Favorite Beer!">
    </form>
    </div>

    <div id='allBeers'>
      ${allBeerHTML}
    </div>
    `
  }

  render() {
    // debugger;
    return `
    <div class='row'>
      <div class='col-lg-2'>
      </div>
      <div class='col-lg-2'>
        <img style='height: 700px'src="${this.image}">
      </div>
      <div style='font-size: 40px' class='col-lg-8'>
        <h1 style='font-size: 60px'>${this.name}</h1>
        <ul>
          <li>Type: ${this.beerType}</li>
          <li>ABV: ${this.abv}</li>
          <li>IBU: ${this.ibu}</li>
        </ul>
        <div class="like-dislike">
          Likes: <span name="like" data-id="${this.id}">${this.likeCount}</span><button name="like" class="like-button"  data-id ="${this.id}" style="font-size:50px;border: none;
            background: none;">👍</button>
          Dislikes: <span name="dislike" data-id="${this.id}">${this.dislikeCount}</span><button name="dislike" class="dislike-button" data-id ="${this.id}" style="font-size:50px;border: none;
            background: none;">👎</button>
        </div>
        <form class="comment-form" data-id="${this.id}">
          <p>Tell us what you think!</p>
          <input type="text">
          <input type="submit" value="Submit">
        </form>
        <h3>Comments</h3>
        <div id="comments${this.id}">
        </div>
      </div>
    </div>
    `
  }


  save() {
    fetch('http://localhost:3000/api/v1/beers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: this.image,
        name: this.name,
        beer_type: this.beerType,
        like_count: this.likeCount,
        dislike_count: this.dislikeCount,
        abv: this.abv,
        ibu: this.ibu,
      })
    })
  }

  updateLike() {
    return fetch(`http://localhost:3000/api/v1/beers/${this.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        like_count: this.likeCount+1
      })
    })
    .then(response => response.json())
    .then(json => {
      this.likeCount = json.like_count
      // debugger;
    })
  }

  updateDisLike() {
    return fetch(`http://localhost:3000/api/v1/beers/${this.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dislike_count: this.dislikeCount+1
      })
    })
    .then(response => response.json())
    .then(json => {
      this.dislikeCount = json.dislike_count
      // debugger;
    })
  }

  attachComments() {
    const allCommentsHTML = Comment.all.map(comment => {
      if(comment.beer_id == this.id) {
        return `${comment.renderComment()}`;
      }
    }).join('')

    return `
    <div>
      <ol class='list' id="${this.id}">
        ${allCommentsHTML}
      </ol>
    </div>`

  }
}

Beer.all = [];
