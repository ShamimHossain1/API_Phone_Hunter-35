const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}


// display phone 

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = "";
    phones = phones.slice(0, 10);

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
                lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
        `
        noPhone.classList.add('d-none')
        phonesContainer.appendChild(phoneDiv);

    });
}

// search btn

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
});

// loadPhones();