// const beerURLPrefix = 'http://localhost:3000/api/v1'
allBeer = [];

document.addEventListener('DOMContentLoaded', e => {
  let beerList = document.getElementById('beer-list')
  renderPage(beerList)
});

function renderPage(beerList) {
  renderComments()
  fetch(`http://localhost:3000/api/v1/beers`)
    .then(res => res.json())
    .then(json => json.forEach(beer => {
      new Beer(beer)
    }))
    .then(() => beerList.innerHTML = Beer.renderAll())
    .then(() => Beer.all.forEach(beer => {
      document.getElementById(`comments${beer.id}`).innerHTML = beer.attachComments()
    }))
    .then(() => commentEventListener())
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
