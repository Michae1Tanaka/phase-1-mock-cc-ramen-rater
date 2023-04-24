// write your code here

//Global Variables
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
const createRamenForm = document.getElementById("new-ramen");

//get edit form for user's own comments/rating
const editRamenForm = document.getElementById("edit-ramen");

//after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  //After dom loads, users should see the div#ramen-menu images, request data from server to get all ramen Obj, then display image for each of the ramen using <img> inside div#ramen-menu
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((data) => data.forEach(createAndAttachRamenImages));

  //After dom loads, first Ramen info appears in the spotlight area
  fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((firstRamen) => {
      detailImage.src = firstRamen[0].image;
      detailImage.id = firstRamen[0].id;
      detailImage.alt = firstRamen[0].name;
      ramenName.textContent = firstRamen[0].name;
      restaurant.textContent = firstRamen[0].restaurant;
      ratingDisplay.textContent = firstRamen[0].rating;
      commentDisplay.textContent = firstRamen[0].comment;
    });
});

//always there
//creates a ramen image for each ramen inside db.json
function createAndAttachRamenImages(ramen) {
  //create image tag for ramen photos
  const image = document.createElement("img");

  //set source  and id for ramen images in the menu and append them there.
  image.setAttribute("src", ramen.image);
  image.setAttribute("id", ramen.id);
  ramenMenu.appendChild(image);

  //add event listener to each image. Event = 'click'
  image.addEventListener("click", imageEventHandler);

  //add event listener to each image that deletes the ramen that is double clicked with mouse
  image.addEventListener("dblclick", deleteEventHandler);

  function deleteEventHandler(e) {
    // creates an alert for user to confirm if user wants to delete a ramen from the menu
    const confirmed = confirm("Are you sure you want to delete?");
    if (confirmed) {
      fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    e.target.remove();
    ramenName.textContent = "Insert Name Here";
    restaurant.textContent = "Insert Restaurant Here";
    detailImage.src = "assets/image-placeholder.jpg";
    ratingDisplay.textContent = "Insert rating here ";
    commentDisplay.textContent = "Insert comment here";
  }

  //If image is clicked its info from db.json fills the spotlit ramen's info
  function imageEventHandler(e) {
    //after event occurs set detailImage source as events target's source
    detailImage.src = ramen.image;
    detailImage.setAttribute("id", ramen.id);
    detailImage.alt = ramen.name;

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

//Events

//add event listener to the submit form to add new ramen image to the menu
createRamenForm.addEventListener("submit", newRamenEventHandler);

//adds an event to the edit form that updates the rating and the comment of the chosen ramen.
editRamenForm.addEventListener("submit", editRamenEventHandler);

//Event Handlers

//Event handler for adding new ramen image to the menu
function newRamenEventHandler(e) {
  e.preventDefault();
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: e.target[0].value,
      restaurant: e.target[1].value,
      image: e.target[2].value,
      rating: e.target[3].value,
      comment: e.target[4].value,
    }),
  };
  fetch("http://localhost:3000/ramens", configurationObject)
    .then((resp) => resp.json())
    .then((data) => {
      const newImage = document.createElement("img");
      newImage.src = data.image;
      newImage.addEventListener("click", newRamenAddedEventHandler);
      newImage.addEventListener("dblclick", newRamenAddedDeleteEventHandler);
      ramenMenu.appendChild(newImage);

      //
      function newRamenAddedEventHandler(e) {
        ratingDisplay.textContent = data.rating;
        commentDisplay.textContent = data.comment;
        detailImage.src = data.image;
        detailImage.alt = data.name;
        ramenName.textContent = data.name;
        restaurant.textContent = data.restaurant;
      }

      function newRamenAddedDeleteEventHandler(e) {
        // creates an alert for user to confirm if user wants to delete a ramen from the menu
        const confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
          fetch(`http://localhost:3000/ramens/${data.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        e.target.remove();
        ramenName.textContent = "Insert Name Here";
        restaurant.textContent = "Insert Restaurant Here";
        detailImage.src = "assets/image-placeholder.jpg";
        ratingDisplay.textContent = "Insert rating here ";
        commentDisplay.textContent = "Insert comment here";
      }
    });

  //resets form after submit
  createRamenForm.reset();
}
//Can't seem to figure this one out.
function editRamenEventHandler(e) {
  e.preventDefault();
  fetch(`http://localhost:3000/ramens/${detailImage.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: e.target[0].value,
      comment: e.target[1].value,
    }),
  })
  .then(resp=>resp.json())
  .then(data=>{
    console.log(data)
    ratingDisplay.textContent = data.rating
    commentDisplay.textContent = data.comment
  })
  //resets form after submit
  editRamenForm.reset();
}
