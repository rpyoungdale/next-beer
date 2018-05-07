// let commentId = 0
class Comment {
  constructor(content, beerId) {
    // this.id = ++commentId
    this.content = content
    this.beerId = beerId
    Comment.all.push(this)
  }

  static renderAll() {
    const allCommentsHTML = Comment.all.map(comment => {
      return comment.render();
    }).join('')

    return `
    <div>
      <ol>
        ${allCommentsHTML}
      </ol>
    </div>`
  }

  render(){
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
        beer_id: this.beerId
      })
    })
  }

}

Comment.all = []
