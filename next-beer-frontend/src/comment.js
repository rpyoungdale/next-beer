// let commentId = 0
class Comment {
  constructor(comment) {
    this.content = comment.content
    this.beer_id = comment.beer_id
    Comment.all.push(this)
  }

  renderComment(){
    return `
      <li>${this.content}</li>`
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
        beer_id: this.beer_id
      })
    })
  }

}

Comment.all = []
