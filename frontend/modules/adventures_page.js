import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const cityParams = new URLSearchParams(search);
  const city = cityParams.get("city");
  return city;
  // console.log(cityID)
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  
  console.log(city)
  // 1. Fetch adventures using the Backend API and return the data
  return fetch(`${config.backendEndpoint}/adventures/?city=${city}`)
    .then((response) => response.json())
    .catch((error) => {
      return null;
    });

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures,"This is adventure")
  const container = document.getElementById("data");


  adventures.forEach((adventure) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col-6", "col-lg-3", "mb-3");
  
    const link = document.createElement("a");
    link.id = adventure.id;
    link.href = `detail/?adventure=${adventure.id}`;
  
    const activityCard = document.createElement("div");
    activityCard.classList.add("activity-card");
  
    const image = document.createElement("img");
    image.src = adventure.image;
    image.alt = adventure.name;
    image.classList.add("activity-card-img");
  
    const categoryBanner = document.createElement("div");
    categoryBanner.classList.add("category-banner");
    categoryBanner.innerText = adventure.category;
  
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("d-md-flex", "justify-content-between", "w-100", "p-2");
  
    const nameElement = document.createElement("h5");
    nameElement.innerText = adventure.name;
  
    const costElement = document.createElement("p");
    costElement.innerText = `${adventure.currency} ${adventure.costPerHead}`;
  
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(costElement);
  
    const durationContainer = document.createElement("div");
    durationContainer.classList.add("d-md-flex", "justify-content-between", "w-100", "p-2");
  
    const durationElement = document.createElement("h5");
    durationElement.innerText = "Duration";
  
    const durationValueElement = document.createElement("p");
    durationValueElement.innerText = `${adventure.duration} Hours`;
  
    durationContainer.appendChild(durationElement);
    durationContainer.appendChild(durationValueElement);
  
    activityCard.appendChild(image);
    activityCard.appendChild(categoryBanner);
    activityCard.appendChild(detailsContainer);
    activityCard.appendChild(durationContainer);
  
    link.appendChild(activityCard);
  
    cardContainer.appendChild(link);
  
    container.appendChild(cardContainer);
  });




  //  const container = document.getElementById("data");

  // // let divtag2 = document.createElement("div");

  // adventures.forEach((ele) => {
  //   let divtag = document.createElement("div");

  //   divtag.className = "col-6 col-lg-3 mb-3";

  //   divtag.innerHTML = `<a id = "${ele.id}" href="detail/?adventure=${ele.id}">
  
  //       <div class="activity-card">
  
  //         <img src="${ele.image}" class ="activity-card img" alt="..." />
  
  //         <div class ="category-banner">${ele.category}</div>
  
  //         <div class="d-md-flex justify-content-between w-100 p-2">
  
  //           <h5>${ele.name}</h5>
  
  //           <p>${ele.currency} ${ele.costPerHead}</p>
  
  //         </div>
  
  //         <div class="d-md-flex justify-content-between w-100 p-2">
  
  //           <h5>Duration</h5>
  
  //           <p>${ele.duration} Hours</p>
  
  //         </div>
  
  //       </div>
  
  //     </a>`;

  //   container.appendChild(divtag);
  // });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // return list.filter(adventure => categoryList.includes(adventure.duration));
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  return list.filter(adventure => categoryList.includes(adventure.category));

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together



function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters,"Filters")

  let filterdList = [];

  if(filters["duration"] && filters["category"].length > 0){
    let choice = filters["duration"].split("-");
    filterdList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filterdList = filterByCategory(filterdList, filters["category"]);
  }

  else if(filters["duration"]){
    let choice = filters["duration"].split("-");
    filterdList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  else if (filters["category"].length > 0){
    filterdList = filterByCategory(list, filters["category"]);
  }

  else{
    filterdList = list;
  }
  // Place holder for functionality to work in the Stubs
  console.log(filterdList, "filterlist");
  return filterdList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  try {
    // 1. Store the filters as a String to localStorage
    localStorage.setItem('filters', JSON.stringify(filters));
    return true;
  } catch (error) {
    console.error('Error saving filters to local storage:', error);
    return false;
  }

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  const storedFiltersString = localStorage.getItem("filters");

  // Parse the JSON string into an object
  try {
      const storedFilters = JSON.parse(storedFiltersString);

      
      return storedFilters;
  } catch (error) {
     
     // Place holder for functionality to work in the Stubs
      return null;
  }
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // document.getElementById("duration-select").value=filters.duration;

  filters["category"].forEach((key)=>{
    let element=document.createElement("div");
    element.className="category-filter";
    element.innerHTML=`<div>${key}</div>`;

    document.getElementById("category-list").appendChild(element);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
