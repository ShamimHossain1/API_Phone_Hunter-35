const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


// display phone 

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = "";

    const showAll = document.getElementById('show-btn')
    if (dataLimit && phones.length > 9) {

        // display 10 phones
        phones = phones.slice(0, 9);

        // show all btn 
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phones
    const noPhone = document.getElementById('no-phone')
    if (phones.length === 0) {

        noPhone.classList.remove('d-none')

    }

    // display all phones
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
            <button href="#" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
        `
        noPhone.classList.add('d-none')
        phonesContainer.appendChild(phoneDiv);

    });
    // loader hide 
    toggleSpinner(false);
}

// load from search name
function loadLimit(dataLimit) {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// search btn

document.getElementById('btn-search').addEventListener('click', function () {

    // loader show
    toggleSpinner(true);
    loadLimit(10);

});

// search input by enter key

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if(e.key==='Enter'){
        loadLimit(10);
    }
});

// loader

const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}

// not the best way to show all
document.getElementById('showAll-btn').addEventListener('click', function () {

    // loader show
    toggleSpinner(true);
    loadLimit();

});

// Phone details

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const details = await res.json();


}

// loadPhones();