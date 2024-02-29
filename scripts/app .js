const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};
const displayPhones = (phone) => {
  //   console.log(phone);
  const phoneContainer = document.getElementById("phone-container");
//   clear phoneContainer card 
    phoneContainer.textContent = '';

  phone.forEach(phone => {
    console.log(phone);
    //  create a new div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-full p-4 bg-gray-100 shadow-xl`;
    // phoneCard.classlist.add('card w-96 bg-gray-100 shadow-');
    // set innerHTML
    phoneCard.innerHTML = `
    <figure class="pt-4"><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>${phone.slug}</p>
    <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
    </div>
    </div>
    `;
    // append child
    phoneContainer.appendChild(phoneCard);
  });
};
// handle search button click
const handleSearch= () => {
    const searchField= document.getElementById('search-field');
    const searchText= searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}
// loadPhone();
 