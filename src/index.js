let addToy = false;

function getToyz(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(resp){
    resp.forEach(toyCards)
  })
}

document.getElementsByClassName('submit')[0].addEventListener('click', () => {
  let name = document.getElementsByTagName('input')[0]
  let image = document.getElementsByTagName('input')[1]
  postObj(name, image)
})

function postObj(name, image){
  event.preventDefault()
  let toyObject = {
    name: name.value,
    image: image.value
  }

  fetch('http://localhost:3000/toys',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toyObject.name,
      'image': toyObject.image,
      'likes': 0,
    })
  })
    .then(response => response.json())
    .then(response => {
      toyCards(response)
    })
    .catch(function(error) {
    alert("WHOA!");
  })
}

function toyCards(t) {
  let likes = document.createElement('p')
  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerHTML = 'Like'
  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = t.image
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML += `
      <h2>${t.name}</h2>

    `
  toyCard.appendChild(img)
  likes.innerHTML = `${t.likes} Likes`
  toyCard.appendChild(likes)
  toyCard.appendChild(button)

  button.addEventListener('click', (event) => {
    let likeCount = event.target.parentElement.children[2].innerHTML = parseInt(event.target.parentElement.children[2].innerHTML) + 1
    likeCount

    fetch('http://localhost:3000/toys/'+`${t.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': likeCount
      })
    })
      .then(response => response.json())
      .then(response => {
        likes.innerHTML = response.likes + ' ' + 'Likes'
        console.log(response.likes)
      })
      .catch(function(error) {
      alert("WHOA!");
    })
  })
  document.getElementById('toy-collection').appendChild(toyCard)
}

document.addEventListener("DOMContentLoaded", () => {
  getToyz()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
