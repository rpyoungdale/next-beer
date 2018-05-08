// const beerURLPrefix = 'http://localhost:3000/api/v1'
allBeer = [];

document.addEventListener('DOMContentLoaded', e => {
  let beerList = document.getElementById('beer-list')
  renderComments()
    .then(() => renderPage(beerList))


});

function renderPage(beerList) {

  fetch(`http://localhost:3000/api/v1/beers`)
    .then(res => res.json())
    .then(json => json.forEach(beer => {
      new Beer(beer)
    }))
    .then(() => {
      beerList.innerHTML = Beer.renderAll()
    })
    .then(() => {
      addNewBeerEventListener()
    })
    .then(() => Beer.all.forEach(beer => {
      document.getElementById(`comments${beer.id}`).innerHTML = beer.attachComments()
    }))
    .then(() => commentEventListener())
    .then(() => {
      listenerForLikesDislike()
    })
}

function commentEventListener() {
  let newCommentForm = document.querySelectorAll('.comment-form')
  newCommentForm.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
      document.querySelectorAll('div ol')[(e.target.dataset.id)-1].innerHTML += newComment.renderComment()
      newComment.save()
    })
  })
}

function renderComments() {
  return fetch(`http://localhost:3000/api/v1/comments`)
  .then(res => res.json())
  .then(json => json.forEach(comment => {
    new Comment(comment)
  }))
}

function addNewBeerEventListener() { //call this somewhere
  let newBeer = document.querySelector('form#new-beer-form')
  newBeer.addEventListener('submit', e => {
    e.preventDefault();
    // debugger;
    let newBeer = new Beer({
      // debugger;
      name: e.target.querySelector('#name').value,
      abv: e.target.querySelector('#abv').value,
      ibu: e.target.querySelector('#ibu').value,
      beer_type: e.target.querySelector('#type').value,
      dislike_count: 0,
      like_count: 0
    })
    let beerArea = document.getElementById('beer-list')
    beerArea.innerHTML += newBeer.render()
    newBeer.save()

  })
}

function listenerForLikesDislike() {
  // debugger;
  let likeButtons = document.querySelectorAll(".like-button")
  let dislikeButtons = document.querySelectorAll(".dislike-button")

  likeButtons.forEach(button => {
    button.addEventListener('click', e => {
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      console.log(e.target.dataset.id)
      // console.log(beer.id)
      console.log(currBeer)
      currBeer.updateLike()
        .then(() => document.getElementById('beer-list').innerHTML = Beer.renderAll())
      // var count = 0
      // let kyle = document.querySelectorAll('span.like')[(e.target.dataset.id)-1].innerText
      // // debugger;
      // document.querySelectorAll('span.like')[(e.target.dataset.id)-1].innerText = parseInt(kyle)+1
    })
  })
  dislikeButtons.forEach(button => {
    button.addEventListener('click', e => {
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      var count = 0
      let kyle = document.querySelectorAll('span.dislike')[(e.target.dataset.id)-1].innerText
      document.querySelectorAll('span.dislike')[(e.target.dataset.id)-1].innerText = parseInt(kyle)+1
    })
  })
}
