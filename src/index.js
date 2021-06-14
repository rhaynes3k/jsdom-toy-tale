let addToy = false;

function getToyz(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(resp){
    // console.log(resp)
    resp.forEach(toyCards)
  })
}

document.getElementsByClassName('submit')[0].addEventListener('click', () => {
  //debugger
  console.log(event.target)
  let name = document.getElementsByTagName('input')[0].value
  let image = document.getElementsByTagName('input')[1].value
  postObj(name, image)
  console.log('clicked')
})

function postObj(name, image){
  console.log(name, image)
  event.preventDefault()
  let toyObject = {
    name: name,
    image: image
  }
  console.log(toyObject)

  fetch('http://localhost:3000/toys',
  {
    method: 'POST',
    headers: {
      ContentType: 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
    .then(response => response.json())
    .then(response => {
    console.log(response)
    })
    .catch(function(error) {
    alert("WHOA!");
    console.log(error);
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
  document.getElementById('toy-collection').appendChild(toyCard)
  // console.log(toyCard)
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
