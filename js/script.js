
//------------------- call API ---------------------

// Fetch normal way 

// const loadPhones = async (searchText, dataLimit) => {
// const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
// fetch(url)
// .then(res => res.json())
// .then(data => displayPhones(data.data, dataLimit))
// catch(error)=> console.log(error)
// }

// Fetch async way 

const loadPhones = async (searchText, dataLimit) => {

    

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


//------------ display phone -----------------------

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = "";

    const showAll = document.getElementById('show-btn')
    if (dataLimit && phones.length > 9) {

        //----- display 10 phones----------
        phones = phones.slice(0, 9);

        // ------show all btn -----------
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //----------- display no phones-------------------------
    const noPhone = document.getElementById('no-phone')
    if (phones.length === 0) {

        noPhone.classList.remove('d-none')

    }

    //----------- display all phones---------------------
    phones.forEach(phone => {
        const phoneDiv = document.createElement('Div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img class="img-fluid" style = "width:50%" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
            </p>
            <button href="#" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"
             data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
        
        </div>
    </div>
        `
        noPhone.classList.add('d-none')
        phonesContainer.appendChild(phoneDiv);

    });
    //--------- loader hide ------------------
    toggleSpinner(false);
}

//-------------- load from search name-------------
function loadLimit(dataLimit) {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

//---------- search btn-------------------

document.getElementById('btn-search').addEventListener('click', function () {

    //---- loader show-----
    toggleSpinner(true);
    loadLimit(10);

});

//------------------ search input by enter key-------------------------

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        loadLimit(10);
    }
});

//--------------------- loader--------------------------------

const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}

//----------------- not the best way to show all-----------------------
document.getElementById('showAll-btn').addEventListener('click', function () {

    // loader show
    toggleSpinner(true);
    loadLimit();

});

//------------- Phone details----------------------

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayPhoneDetails(details.data);


}


// phone details modal

const displayPhoneDetails = details => {

    const phoneName = document.getElementById('phoneDetailsLabel');
    const phoneDetails = document.getElementById('phone-details');
   
    phoneName.innerText = details.name;
    phoneDetails.innerHTML = `
   
    <span></span>
    <img src="${details.image ? details.image:"No Image Found"}" class="img-fluid mb-4" style = "width:50%" alt="">
    <p><span  class="fw-semibold">ChipSet:</span> ${details.mainFeatures.chipSet ? details.mainFeatures.chipSet:"No Information"}</p>
    <p><span  class="fw-semibold">Display Size:</span> ${details.mainFeatures.displaySize ? details.mainFeatures.displaySize:"No Information"}</p>
    <p><span  class="fw-semibold">Memory:</span> ${details.mainFeatures.memory ? details.mainFeatures.memory:"No Information"}</p>
    <p><span  class="fw-semibold">Storage:</span> ${details.mainFeatures.storage ? details.mainFeatures.storage:"No Information"}</p>
    <p><span  class="fw-semibold">Release Date:</span> ${details.releaseDate ? details.releaseDate:"No Information"}</p>
      
    `



}

loadPhones('apple');