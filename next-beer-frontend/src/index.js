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
    .then(() => nextBeer())
    .then(() => allBeers())

}

function allBeers() {
  let beerList = document.getElementById('beer-list')
  let allBeersButton = document.getElementById('all-beers')
  allBeersButton.addEventListener('click', e => {
    e.preventDefault()
    renderPage(beerList)
    // document.getElementById('beer-list').innerHTML = Beer.renderAll()

  })
}

function nextBeer() {
  let beerList = document.getElementById('beer-list')
  let nextBeerButton = document.getElementById('next-beer')
  nextBeerButton.addEventListener('click', e => {
    e.preventDefault()
    let index = Math.floor(Math.random()*Beer.all.length)
    let randomBeer = Beer.all[index]
    beerList.innerHTML = randomBeer.render()
    document.getElementById(`comments${randomBeer.id}`).innerHTML = randomBeer.attachComments()
    addSingleCommentListener()
  })
}

function addSingleCommentListener() {
  let commentForm = document.querySelector('.comment-form')
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
    document.querySelector('div ol').innerHTML += newComment.renderComment()
    newComment.save()
  })
}


function commentEventListener() {
  let newCommentForm = document.querySelectorAll('.comment-form')
  newCommentForm.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
      let beerIndex = e.target.dataset.id

      // debugger;
      document.querySelectorAll('div ol').forEach(beer => {
        // debugger;
        if(beer.id == (beerIndex)){
          // debugger;
          beer.innerHTML += newComment.renderComment();
        }
      })


      // document.querySelectorAll('div ol')[(e.target.dataset.id)-1].innerHTML += newComment.renderComment()
      newComment.save()
      // debugger;
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
    let newBeer = new Beer({
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
  let beerDiv = document.getElementById('beer-list')
  beerDiv.addEventListener('click', e => {
    // debugger;
    if(e.target.name === 'like'){
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      currBeer.updateLike()
        .then(() => {
          if(document.getElementById('beer-list').children.length === 2) {
            document.getElementById('beer-list').innerHTML = Beer.renderAll()
          } else {
            let beerList = document.getElementById('beer-list')
            let currBeer = Beer.all.find(beer => beer.id == document.querySelector('.comment-form').dataset.id)
            beerList.innerHTML = currBeer.render()
            document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
            addSingleCommentListener()
          }
        })
    } else if(e.target.name === 'dislike') {
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      currBeer.updateDisLike()
        .then(() => {
          if(document.getElementById('beer-list').children.length === 2) {
            document.getElementById('beer-list').innerHTML = Beer.renderAll()
          } else {
            let beerList = document.getElementById('beer-list')
            let currBeer = Beer.all.find(beer => beer.id == document.querySelector('.comment-form').dataset.id)
            beerList.innerHTML = currBeer.render()
            document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
            addSingleCommentListener()
          }
        })
    }
  })




}
