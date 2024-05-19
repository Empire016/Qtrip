import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  try {
    
    const urlSearchParams = new URLSearchParams(search);
    const adventureId = urlSearchParams.get("adventure");

    
    return adventureId;
} catch (error) {
  return null;;
}
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call


  try{
    const response=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    const adventuresData = await response.json();

    return adventuresData;

  }

  catch (error) { 
    return null;
}
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.querySelector("#adventure-name").innerHTML=adventure.name;

  document.querySelector("#adventure-subtitle").innerHTML=adventure.subtitle;


  document.querySelector("#adventure-content").innerHTML=adventure.content;


  const photoGalleryElement = document.querySelector("#photo-gallery");
  photoGalleryElement.innerHTML = '';
  
  // Loop through images and create div elements
  adventure.images.forEach((image) => {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('carousel-item');
  
      // Create an img element and set its attributes
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.classList.add('activity-card-image');
  
      // Append the img element to the image div
      imageDiv.appendChild(imgElement);
  
      // Append the image div to the photo-gallery
      photoGalleryElement.appendChild(imageDiv);

    });

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  
  document.querySelector("#photo-gallery").innerHTML = "";

  document.querySelector("#photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

images.forEach((image,idx) => {
  let ele=document.createElement("div");
   ele.className=`carousel-item ${idx === 0 ? "active" : ""}`;
  ele.innerHTML=`<img 
  src=${image}
  alt=""
  srcset=""
  class="activity-card-image pb-3 pb-md-0"
  />
  `;

  document.querySelector(".carousel-inner").appendChild(ele);


});
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available){
    document.querySelector("#reservation-panel-available").style.display="block";

    document.querySelector("#reservation-panel-sold-out").style.display="none";

    document.querySelector("#reservation-person-cost").innerHTML=adventure.costPerHead;;
  }

  else{

    document.querySelector("#reservation-panel-sold-out").style.display="block";

    document.querySelector("#reservation-panel-available").style.display="none";

  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.querySelector("#reservation-cost").innerHTML=persons*adventure.costPerHead;;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.querySelector("#myForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let url = config.backendEndpoint + "/reservations/new";

    let formElements = form.elements;

    let bodyString = JSON.stringify({
        name: formElements["name"].value,
        date: formElements["date"].value,
        person: formElements["person"].value,
        adventure: adventure.id,
    });

    try {
        let res = await fetch(url, {
            method: "POST",
            body: bodyString, // Corrected variable name
            headers: {
                "Content-Type": "application/json", // Corrected header field
            },
        });

        if (res.ok) {
            alert("Success!");
            window.location.reload();
        } else {
            let data = await res.json();
            alert(`Failed - ${data.message}`);
        }
    } catch (err) {
        console.log(err);
        alert("Failed - Fetch call resulted in an error");
    }
});


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved){
    document.querySelector("#reserved-banner").style.display="block";

  }
  else{
    document.querySelector("#reserved-banner").style.display="none";


  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
