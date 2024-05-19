import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  const response = await fetch(`${config.backendEndpoint}/cities`);
  const cities = await response.json()
  console.log(response)
  return cities;
}catch(errror){
   return null;
}

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  console.log(id, city, description, image)
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

 const container = document.getElementById('data');

  const colDiv = document.createElement('div');
  colDiv.classList.add('col-6', 'col-lg-3', 'mb-3');

  const link = document.createElement('a');
  link.setAttribute('href', `pages/adventures/?city=${id} `);
  link.setAttribute('id', id);  // Set another attribute

  // link.id = id;

  const tileDiv = document.createElement('div');
  tileDiv.classList.add('tile');

  const tileTextDiv = document.createElement('div');
  tileTextDiv.classList.add('tile-text', 'text-center');
  tileTextDiv.innerHTML = `<h5>${city}</h5><p>${description}</p>`;

  const img = document.createElement('img');
  img.setAttribute('class', 'img-responsive');
  img.setAttribute('src', image);

  tileDiv.appendChild(tileTextDiv);
  tileDiv.appendChild(img);
  link.appendChild(tileDiv);
  colDiv.appendChild(link);
  container.appendChild(colDiv);

  console.log('Adding city to DOM:', id, city, description, image);

}



export { init, fetchCities, addCityToDOM };




// async function init() {
//   //Fetches list of all cities along with their images and description
//   console.log("From init()");
//   console.log(config);
//   let cities = await fetchCities();
//   console.log(cities);
  

//   //Updates the DOM with the cities
//   if (cities) {
//     cities.forEach((key) => {
//       addCityToDOM(key.id, key.city, key.description, key.image);
//     });

   
//   }
// }

// //Implementation of fetch call
// async function fetchCities() {
//   // TODO: MODULE_CITIES
//   // 1. Fetch cities using the Backend API and return the data
//   try{
//     let content=await fetch(`${config.backendEndpoint}/cities`)

//     if(!content.ok){
//       throw new Error(`Fetch failed with status:${content.status}-${content.statusText}`)
//     }
//   let output=await content.json();
//   return output;
//   }
//   catch(error){
//     return null;


//   }
  
// }


// //Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM

// //  console.log(id)
//   const cityCard = document.createElement('div');
//   cityCard.className = 'col-12 col-sm-6 col-lg-3 mb-4';
 
//   cityCard.innerHTML = `
//     <a href="pages/adventures/?city=${id}" id="${id}">
//       <div class="tile">
//         <div class="tile-text text-center text-white">
//           <h5>${city}</h5>
//           <p>${description}</p>
//         </div>
//         <img class="img-responsive" src="${image}" alt="${city}">
//       </div>
//     </a>
//   `;

//   // Get the reference to the DOM element where you want to append the city card
//   const rowDiv = document.querySelector('.row');

//   // Append the city card to the DOM
//   rowDiv.appendChild(cityCard);
  
// }

// export { init, fetchCities, addCityToDOM };
