function getToyz(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(function(resp){
    console.log(resp)
    resp.forEach(toyCards)
  })
}



function toyCards(t) {
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML += `
    ${t.name}
    ${t.image}
  `
  document.getElementById('toy-collection').append(toyCard)
}
