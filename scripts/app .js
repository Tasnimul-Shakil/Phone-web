const loadPhone = async (searchText = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  //   console.log(phone);
  const phoneContainer = document.getElementById("phone-container");
  //   clear phoneContainer card
  phoneContainer.textContent = "";

  // display show all phones
  const showAll = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    //  create a new div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-full p-4 bg-gray-100 shadow-xl`;
    // phoneCard.classlist.add('card w-96 bg-gray-100 shadow-');
    // set innerHTML
    phoneCard.innerHTML = `
    <figure class="pt-4"><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>8.4mm thickness
    Android 14, One UI 6
    128GB/256GB storage, microSD</p>
    <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
    </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleSearch(false);
};

// show details
const handleShowDetails = async (id) => {
  // console.log('show data', id);
  // load details data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

// display details
const showPhoneDetails = (phone) => {
  console.log(phone);
  // const phoneName = document.getElementById("phone-name");
  // phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById("show-detail-container");

  showDetailsContainer.innerHTML=`
        <figure class="px-10">
          <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body p-0 items-start text-start">
          <h2 class="card-title text-2xl font-bold">${phone.name}</h2>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          <p><span class="font-bold">Brand: </span>${phone?.mainFeatures?.brand}</p>
          <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
          <p><span class="font-bold">Display: </span>${phone?.mainFeatures?.display}</p>
          <p><span class="font-bold">Chip set: </span>${phone?.mainFeatures?.chipSet}</p>
          <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
          <p><span class="font-bold">Sensors: </span>${phone?.mainFeatures?.sensors}</p>
        </div>
  `

  show_details_modal.showModal();
};

// handle search button click
const handleSearch = (isShowAll) => {
  toggleSearch(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleSearch = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle search button click

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
