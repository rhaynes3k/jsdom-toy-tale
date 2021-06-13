let addToy = false;

function getToyz(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(resp){
    // console.log(resp)
    resp.forEach(toyCards)
  })
}
let postObj = {
  method: 'POST',
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    name: 'input.name',
    image: 'input.image'
  })
}
document.getElementsByClassName('submit')[0].addEventListener('click', () =>{
  fetch('http://localhost:3000/toys', postObj)
  console.log(event)
})

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
