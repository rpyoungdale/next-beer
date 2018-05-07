// const beerURLPrefix = 'http://localhost:3000/api/v1'
allBeer = [];

document.addEventListener('DOMContentLoaded', e => {
  let beerList = document.getElementById('beer-list')

  renderPage(beerList)
});

function renderPage(beerList) {
  fetch(`http://localhost:3000/api/v1/beers`)
  .then(res => res.json())
  .then(json => json.forEach(beer => {
    new Beer(beer)
  }))
  // .then(() => renderComments())
  .then(() => beerList.innerHTML = Beer.renderAll())
  .then(() => document.getElementById('comments').innerHTML = Comment.renderAll())
  .then(() => commentEventListener())
}

function commentEventListener() {
  let newComment = document.querySelector('form#comment-form')
  // debugger;
  newComment.addEventListener('submit', e => {
    // debugger
    e.preventDefault();
    debugger
    let newComment = new Comment(e.target.querySelector('input').value, parseInt(e.target.dataset.id))
    document.getElementById('comments').innerHTML = Comment.renderAll()
    newComment.save()
  })

}

function renderComments() {
  return fetch(`http://localhost:3000/api/v1/comments`)
  .then(res => res.json())
  .then(json => json.forEach(comment => {
    new Comment(comment)
  }))
}
