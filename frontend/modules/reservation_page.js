import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{
    const response=await fetch(`${config.backendEndpoint}/reservations/`) ;

    const reservations = await response.json();

    return reservations;

  }

  catch (error) {
   
    return null;
}



}




//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table



  if(reservations.length> 0){
    document.querySelector("#reservation-table-parent").style.display="block";
    document.querySelector("#no-reservation-banner").style.display="none";


  }

  else{
    document.querySelector("#reservation-table-parent").style.display="none";
    document.querySelector("#no-reservation-banner").style.display="block";


  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

reservations.map((key,idx) => {

  let ele=document.createElement("tr");
  ele.innerHTML=`<th scope="row">${key.id}</th>
  <td>${key.name}</td>
  <td>${key.adventureName}</td>
  <td>${key.person}</td>
  <td>${new Date(key.date).toLocaleDateString("en-IN",{
    day:"numeric",
    year:"numeric",
    month:"numeric",
    
  })}</td>
  <td>${key.price}</td>
  <td>${new Date(key.time).toLocaleDateString("en-IN",{
    year:"numeric",
    day:"numeric",
    month:"long",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    hour12:true,
  })
  .replace(" at", ",")}</td> 
  <td style="display:flex;gap:5px">
  <div class="reservation-visit-button" id="${key.id}"><a href="../detail/?adventure=${key.adventure}">
  Visit Adventure</a>
  </div>
  </td>
  


  
`

document.querySelector("#reservation-table").appendChild(ele);


});
  


}

export { fetchReservations, addReservationToTable };