class Beer {
  constructor(json) {
    this.id = json.id;
    if(json.comments) {
      this.comments = this.appendComments(json.comments)
    } else {
      this.comments = []
    }
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
    // this.comments = json.comments
    Beer.all.push(this);
  }

  appendComments(json) {
    let commentsArray = []
    json.forEach(comment => {
      commentsArray.push(new Comment(comment))
    })
    return commentsArray
  }

  static renderAll(beers=Beer.all) {
    const allBeerHTML = beers.map(beer => {
      return beer.render();
    }).join('')

    return `
    <div class="ui centered grid" id='allBeers' style='margin-top:40px;'>
      ${allBeerHTML}
    </div>
    `
  }

  render() {
    let commentsHTML = ''
    if(this.comments.length){
      commentsHTML = this.comments.map(comment => {
        return `<li>${comment.content}</li>`
      }).join('')
    }
    // debugger;
    return `
    <div class="five wide column">
    <div class="ui centered card" style="margin-top:75px; background-color:rgba(255, 255, 255, 0.5); min-width:510px;">
      <div style="padding:30px">
        <img style="margin-top:30px; margin-bottom:30px; min-height:500px; max-height:500px" class = "ui centered image" src="${this.image}">
      </div>
      <div class="content" style="text-align:center; background-color:rgba(255, 255, 255, 0.5)">
        <a class="header">
          <h1 data-id='${this.id}'>${this.name}</h1>
          </a>

        <div class="description" >

            <h2>Type: ${this.beerType} ||
            ABV: ${this.abv} ||
            IBU: ${this.ibu}</h2>

        </div>
        <h3>
      </div>
    </div>
    </div>
    `
    // <div class="like-dislike" >
    // Likes: <span name="like" data-id="${this.id}">${this.likeCount}</span><button name="like" class="like-button"  data-id ="${this.id}" style="border: none;
    // background: none;">👍</button>
    // Dislikes: <span name="dislike" data-id="${this.id}">${this.dislikeCount}</span><button name="dislike" class="dislike-button" data-id ="${this.id}" style="border: none;
    // background: none;">👎</button>
    // </div>
    // </h3>
    // <div class="extra content">
    // <div class="ui comments" style="color:black">
    // <h3>Comments</h3>
    // <ul class="text" id="comments${this.id}">
    // ${commentsHTML}
    // </ul>
    // <form class="ui reply form" id="comment-form" data-id="${this.id}">
    // <input type="text" placeholder="Add Comment!">
    // <input style="visibility: hidden;" type="submit" value="Submit">
    // </form>
    // </div>
    // </div>
  }

  renderNextBeer() {
    // debugger
    let commentsHTML = ''
    if(this.comments.length){
      commentsHTML = this.comments.map(comment => {
        return `<li>${comment.content}</li>`
      }).join('')
    }
    // debugger;
    return `
    <div class="ui centered card" style="margin-top:129px; min-width:510px; background-color:rgba(255, 255, 255, 0.5)">
      <div>
        <img style="margin-top:30px; margin-bottom:30px; min-height:500px; max-height:500px" class="ui centered image" src="${this.image}">
      </div>
      <div class="content" style="text-align:center; background-color:rgba(255, 255, 255, 0.5)">
        <a class="header"><h1>${this.name}</h1></a>
          <div class="description" >
            <h3>Type: ${this.beerType} ||
            ABV: ${this.abv} ||
            IBU: ${this.ibu}</h3><br>
          </div>
        <h3>
          <div class="like-dislike" >
          Likes: <span name="like" data-id="${this.id}">${this.likeCount}</span><button name="like" class="like-button"  data-id ="${this.id}" style="border: none;
          background: none;">👍</button>
          Dislikes: <span name="dislike" data-id="${this.id}">${this.dislikeCount}</span><button name="dislike" class="dislike-button" data-id ="${this.id}" style="border: none;
          background: none;">👎</button>
          </div>
        </h3>
      </div>
      <div class="extra content" style="background-color:rgba(255, 255, 255, 0.5)">
        <button class="fluid ui button" id="next-beer-card">Next Brewski</button>
      </div>
    </div>`
  }
  // let beerRestaurants = []

  // function randomName(currBeer) {
  //   debugger
  //   beerRestaurants = []
  //   Restaurant.all.forEach(restaurant => {
  //     debugger
  //     restaurant.beers.forEach(beer => {
  //       debugger
  //     })
  //   })
  // }

  showBeer() {
    let commentsHTML = ''
    if(this.comments.length){
      commentsHTML = this.comments.map(comment => {
        return `<li>${comment.content}</li>`
      }).join('')
    }

    // let currBeer = this
    // randomName(currBeer)

    return `
    <div class="five wide column">
    <div class="ui centered card" style="margin-top:129px; background-color:rgba(255, 255, 255, 0.5); min-width:510px;">
      <div style="padding:30px">
        <img style="margin-top:30px; margin-bottom:30px; min-height:500px; max-height:500px" class = "ui centered image" src="${this.image}">
      </div>
      <div class="content" style="text-align:center; background-color:rgba(255, 255, 255, 0.5)"">
        <a class="header">
          <h1 data-id='${this.id}'>${this.name}</h1>
        </a>
        <div class="description" >
            <h2>Type: ${this.beerType} ||
            ABV: ${this.abv} ||
            IBU: ${this.ibu}</h2>
        </div>
        <div>
          <h3>

          </h3>
        </div>
        <h3>
        <div class="like-dislike" >
        Likes: <span name="like" data-id="${this.id}">${this.likeCount}</span><button name="like" class="like-button"  data-id ="${this.id}" style="border: none;
        background: none;">👍</button>
        Dislikes: <span name="dislike" data-id="${this.id}">${this.dislikeCount}</span><button name="dislike" class="dislike-button" data-id ="${this.id}" style="border: none;
        background: none;">👎</button>
        </div>
        </h3>
      </div>
      <div class="content" style="background-color:rgba(255, 255, 255, 0.5)">
        <div class="extra content">
        <div class="ui comments" style="color:black">
        <h3>Comments</h3>
        <ul class="text" id="comments${this.id}">
        ${commentsHTML}
        </ul>
        <form class="ui reply form" id="comment-form" data-id="${this.id}">
        <input type="text" placeholder="Add Comment!">
        <input style="visibility: hidden;" type="submit" value="Submit">
        </form>
        </div>
        </div>
      </div>
    </div>
    </div>
    `
  }

  updateLike() {
    return fetch(`http://localhost:3000/api/v1/beers/${this.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // console.log("persisting", this.likeCount)
        like_count: this.likeCount
      })
    })
    .then(response => response.json())
    .then(json => {
      let currBeer = Beer.all.find(beer => beer.id === this.id)
      // currBeer.likeCount
    })
  }

  updateDislike() {
    return fetch(`http://localhost:3000/api/v1/beers/${this.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dislike_count: this.dislikeCount
      })
    })
    .then(response => response.json())
    .then(json => {
      // this.dislikeCount++
    })
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

}

Beer.all = [];
