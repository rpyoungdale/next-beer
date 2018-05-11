document.addEventListener('DOMContentLoaded', e => {
  let p1 = fetch(`http://localhost:3000/api/v1/beers`)
    .then(res => res.json())
    .then(json => {
      // console.log(json)
      json.forEach(beer => new Beer(beer))

  }).then(() => {
    fetch(`http://localhost:3000/api/v1/restaurants`)
      .then(res => res.json())
      .then(json => json.forEach(restaurant => {
        new Restaurant(restaurant)
      })).then(() => {
        domManipulation()
      })
  })
})

function domManipulation() {
  renderAllContent()
  addLikeDislikeListener()
  allBeers()
  nextBeer()
  addJqueryandRestaurantListener()
  addCommentListener()
  addSearchListener()
  // addNewBeerEventListener()
}

function renderAllContent() {
  let beerList = document.getElementById('beer-list')
  beerList.innerHTML = Beer.renderAll() //copied from below might want to refactor
}

function addLikeDislikeListener() {
  let beerDiv = document.getElementById('beer-list')
  beerDiv.addEventListener('click', e => {
    // console.log('this is likedislikelistener', Beer.all)
    if(e.target.name === 'like'){
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      currBeer.likeCount++
      let spans = document.querySelectorAll('span')
      let beerArray = [...spans]
      beerArray.find(span => (span.dataset.id == currBeer.id && span.getAttribute('name') == 'like')).innerText = currBeer.likeCount
      currBeer.updateLike()
    } else if(e.target.name === 'dislike'){
      let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
      currBeer.dislikeCount++
      let spans = document.querySelectorAll('span')
      let beerArray = [...spans]
      // debugger
      beerArray.find(span => (span.dataset.id == currBeer.id && span.getAttribute('name') == 'dislike')).innerText = currBeer.dislikeCount
      currBeer.updateDislike()
    }
})}

function allBeers() {
  let allBeersButton = document.getElementById('all-beers')
  allBeersButton.addEventListener('click', e => {
    let beerList = document.getElementById('beer-list')
    beerList.innerHTML = ''
    // console.log(Beer.all)
    beerList.innerHTML = Beer.renderAll()
    // ('beer-list').innerHTML = Beer.renderAll()
  })
}

function nextBeer() {
  let nextBeerButton = document.getElementById('next-beer')
  nextBeerButton.addEventListener('click', e => {
    let beerList = document.getElementById('beer-list')
    let index = Math.floor(Math.random()*Beer.all.length)
    let randomBeer = Beer.all[index]
    // console.log("Random",randomBeer.likeCount)
    beerList.innerHTML = randomBeer.renderNextBeer()

    document.getElementById('next-beer-card').addEventListener('click', e => {
      let beerList = document.getElementById('beer-list')
      let index = Math.floor(Math.random()*Beer.all.length)
      let randomBeer = Beer.all[index]
      beerList.innerHTML = randomBeer.renderNextBeer()
      nextBeer()
    })
    // console.log(randomBeer, randomBeer.likeCount)
    // document.getElementById(`comments${randomBeer.id}`).innerHTML = randomBeer.attachComments()
    // addSingleCommentListener()
  })
  if(document.getElementById('next-beer-card')) {
    document.getElementById('next-beer-card').addEventListener('click', e => {
      let beerList = document.getElementById('beer-list')
      let index = Math.floor(Math.random()*Beer.all.length)
      let randomBeer = Beer.all[index]
      beerList.innerHTML = randomBeer.renderNextBeer()
      nextBeer()
    })
  }
}


function addJqueryandRestaurantListener() {
  Restaurant.render()
  // console.log("restuarant lister", Beer.all);
  $('.dropdown').dropdown({onChange: restaurantListener});
  // $('.shape').shape('flip up', onClick);
}

function restaurantListener(value, text) {
    if(event.target.dataset.id) {
      let selectedRestaurant = Restaurant.all.find(restaurant => {
        return restaurant.id == event.target.dataset.id
      })
      document.getElementById('beer-list').innerHTML = ''
      document.getElementById('beer-list').innerHTML = `<h1 class="ui block header" style="text-align:center; margin:100px 700px -80px 700px; background-color:rgba(220,220,220,1)" >${selectedRestaurant.name} Draft List</h1>`
      document.getElementById('beer-list').innerHTML += Beer.renderAll(selectedRestaurant.beers)
    }
}

function addCommentListener() {
  let beerDiv = document.getElementById('beer-list')
  beerDiv.addEventListener('submit', e => {
    e.preventDefault()
    let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
    newComment.save()
    document.getElementById(`comments${e.target.dataset.id}`).innerHTML += newComment.renderComment()
    e.target.querySelector('input').value = ''
  })
}

function addSearchListener() {
  let searchInput = document.getElementById('searchBeerName')
  searchInput.addEventListener('input', e => {
    let filteredBeers = Beer.all.filter(beer => beer.name.toLowerCase().includes(e.target.value.toLowerCase()))
    let beerArea = document.getElementById('beer-list')
    beerArea.innerHTML = Beer.renderAll(filteredBeers)
  })
}

// function addNewBeerEventListener() { //listens for the new beer form
//   let newBeer = document.querySelector('form#new-beer-form')
//   newBeer.addEventListener('submit', e => {
//     e.preventDefault();
//     let newBeer = new Beer({
//       name: e.target.querySelector('#name').value,
//       abv: e.target.querySelector('#abv').value,
//       ibu: e.target.querySelector('#ibu').value,
//       beer_type: e.target.querySelector('#type').value,
//       dislike_count: 0,
//       like_count: 0
//     })
//     debugger
//     let beerArea = document.getElementById('beer-list')
//     beerArea.innerHTML += newBeer.render()
//     newBeer.save()
//   })
// }







// function renderRestaurants() {
//   fetch(`http://localhost:3000/api/v1/restaurants`)
//   .then(res => res.json())
//   .then(json => {
//     // console.log(json)
//     json.forEach(restaurant => {
//       // debugger
//       new Restaurant(restaurant)
//     })
//   })
//   .then(() => Restaurant.render())
//   .then(() => addJqueryandRestaurantListener())
// }









//
// function loadPage() {
//   let beerList = document.getElementById('beer-list')
//   renderComments()
//     .then(() => renderPage(beerList))
// }
//
// // function renderPage(beerList) {
// //   return fetch(`http://localhost:3000/api/v1/beers`)
// //     .then(res => res.json())
// //     .then(json => json.forEach(beer => {
// //       new Beer(beer)
// //     }))
// //     .then(() => {
// //       beerList.innerHTML = Beer.renderAll()
// //     })
// //     .then(() => {
// //       addNewBeerEventListener()
// //     })
// //     .then(() => Beer.all.forEach(beer => {
// //       document.getElementById(`comments${beer.id}`).innerHTML = beer.attachComments()
// //     }))
// //     .then(() => commentEventListener())
// //     .then(() => {
// //       listenerForLikesDislike()
// //     })
// //     .then(() => nextBeer())
// //     .then(() => allBeers())
// //
// //
// // }
//
//
//
//
// function addSingleCommentListener() {
//   let commentForm = document.querySelector('#comment-form')
//   commentForm.addEventListener('submit', e => {
//     e.preventDefault();
//     let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
//     document.querySelector('div ol').innerHTML += newComment.renderComment()
//     newComment.save()
//   })
// }
//
//
// function commentEventListener() {
//   debugger
//   let newCommentForm = document.querySelectorAll('#comment-form')
//   newCommentForm.forEach(form => {
//     form.addEventListener('submit', e => {
//       e.preventDefault();
//       // debugger
//       let newComment = new Comment({content: e.target.querySelector('input').value, beer_id: parseInt(e.target.dataset.id)}) //TEST THIS
//       let beerIndex = e.target.dataset.id
//
//       // debugger;
//       document.querySelectorAll('div ol').forEach(beer => {
//         // debugger;
//         if(beer.id == (beerIndex)){
//           // debugger;
//           beer.innerHTML += newComment.renderComment();
//         }
//       })
//
//
//       // document.querySelectorAll('div ol')[(e.target.dataset.id)-1].innerHTML += newComment.renderComment()
//       newComment.save()
//       // debugger;
//     })
//   })
// }
//
// function renderComments() {
//   return fetch(`http://localhost:3000/api/v1/comments`)
//   .then(res => res.json())
//   .then(json => json.forEach(comment => {
//     new Comment(comment)
//   }))
// }
//
//
//
// function listenerForLikesDislike() {
//   let beerDiv = document.getElementById('beer-list')
//   beerDiv.addEventListener('click', e => {
//     // debugger;
//     if(e.target.name === 'like'){
//       let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
//       currBeer.updateLike()
//         .then(() => {
//           if(document.getElementById('beer-list').children.length === 2) {
//             document.getElementById('beer-list').innerHTML = Beer.renderAll()
//             document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
//             commentEventListener()
//           } else {
//             let beerList = document.getElementById('beer-list')
//             let currBeer = Beer.all.find(beer => beer.id == document.querySelector('#comment-form').dataset.id)
//             beerList.innerHTML = currBeer.render()
//             document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
//             addSingleCommentListener()
//           }
//         })
//     } else if(e.target.name === 'dislike') {
//       let currBeer = Beer.all.find(beer => (beer.id == e.target.dataset.id))
//       currBeer.updateDisLike()
//         .then(() => {
//           if(document.getElementById('beer-list').children.length === 2) {
//             document.getElementById('beer-list').innerHTML = Beer.renderAll()
//             document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
//             commentEventListener()
//           } else {
//             let beerList = document.getElementById('beer-list')
//             let currBeer = Beer.all.find(beer => beer.id == document.querySelector('#comment-form').dataset.id)
//             beerList.innerHTML = currBeer.render()
//             document.getElementById(`comments${currBeer.id}`).innerHTML = currBeer.attachComments()
//             addSingleCommentListener()
//           }
//         })
//     }
//   })
//
// }
