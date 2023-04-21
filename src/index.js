// write your code here

document.addEventListener("DOMContentLoaded", () => {
  //After dom loads, users should see the div#ramen-menu images, request data from server to get all ramen Obj, then display image for each of the ramen using <img> inside div#ramen-menu
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((data) => data.forEach(createAndAttachRamenImages));
});

//GLobal Variables
//get h2 tag with class .name for name of ramen
const ramenName = document.querySelector(".name");

//get div tag with id ramen-menu for ramen photos
const ramenMenu = document.getElementById("ramen-menu");

//get image tag with class detail-image for ramen image
const detailImage = document.querySelector(".detail-image");

//get h3 tag with class restaurant for restaurant name
const restaurant = document.querySelector(".restaurant");

//get span tag with id rating-display for ramen rating
const ratingDisplay = document.getElementById("rating-display");

//get p tag with id comment-display for ramen comment.
const commentDisplay = document.getElementById("comment-display");

//get form tag with id new-ramen for when user submits new ramen
const form = document.getElementById("new-ramen");

function createAndAttachRamenImages(ramen, index) {
  //create image tag for ramen photos
  const image = document.createElement("img");
  
  //set id and source for ramen images in the menu and append them there.
  image.setAttribute("src", ramen.image);
  image.setAttribute("id", `image_${index + 1}`);
  ramenMenu.appendChild(image);

  //add event listener to each image. Event = 'click'
  image.addEventListener("click", imageEventHandler);

  //create callback function for event handler
  function imageEventHandler(e) {
    //after event occurs set detailImage source as events target's source
    detailImage.src = ramen.image;

    //after event occurs set ramenName text content as events target's name
    ramenName.textContent = ramen.name;

    //after event occurs set restaurant text content as events target's restaurant's name
    restaurant.textContent = ramen.restaurant;

    //after event occurs set ratingDisplay text content as events target's rating
    ratingDisplay.textContent = ramen.rating;

    //after event occurs set commentDisplay text content as events target's comment
    commentDisplay.textContent = ramen.comment;
  }
}

//add event listener to the submit form to add new ramen image to the menu
form.addEventListener("submit",newRamenEventHandler)

//Event handler for adding new ramen image to the menu
function newRamenEventHandler(e){
  e.preventDefault();
  const newRamenImage = document.createElement('img');
  newRamenImage.setAttribute('src', e.target[2].value)
  ramenMenu.appendChild(newRamenImage)
}