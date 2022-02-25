const gallery_container = document.querySelector(".img_container");
const input_text = document.querySelector(".input");
const cancel_btn = document.querySelector(".cancel");
const search_btn = document.querySelector(".search_btn");
const more = document.querySelector(".more");
const bigImage = document.querySelector(".big_image");

let word = "morning";
let address = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f8bc164bb2384a8dab17f91fbbe83402&tags=${word}&format=json&nojsoncallback=1`;

function createCard(arr) {
  let url = `https://live.staticflickr.com/${arr[0]}/${arr[1]}_${arr[2]}_w.jpg`;
  const card = document.createElement("div");
  const img = document.createElement("img");
  img.alt = "image";
  img.src = url;
  card.classList.add("divCard");
  img.classList.add("card");
  card.append(img);
  gallery_container.append(card);

  card.addEventListener("click", () => {
    let bigUrl = `https://live.staticflickr.com/${arr[0]}/${arr[1]}_${arr[2]}_b.jpg`;
    document.querySelector(".image").style.backgroundImage = `url(${bigUrl})`;
    bigImage.style.display = "flex";
    bigImage.onclick = () => {
      bigImage.style.display = "none";
    };
  });
}

function fillGallery(data, num) {
  let quantity = data.photos.photo.length;
  if (num > quantity) {
    more.style.visibility = "hidden";
  } else {
    gallery_container.innerHTML = "";
    for (let i = num - 30; i < num && i < quantity; i++) {
      let serverId = data.photos.photo[i].server;
      let id = data.photos.photo[i].id;
      let secret = data.photos.photo[i].secret;
      let arr = [serverId, id, secret];
      createCard(arr);
      if (quantity > num) {
        document.addEventListener("scroll", function (e) {
          let documentHeight = document.body.scrollHeight;
          let currentScroll = window.scrollY + window.innerHeight;

          let modifier = 20;
          /*        console.log(documentHeight);
        console.log(currentScroll); */
          if (currentScroll + modifier > documentHeight && quantity > num) {
            /*   console.log("You are at the bottom!"); */
            more.style.visibility = "visible";
            more.onclick = () => {
              num += 30;
              window.scrollTo(0, 0);
              fillGallery(data, num);
              console.log(`num = ${num} quantity = ${quantity}`);
            };
          } else {
            more.style.visibility = "hidden";
          }
        });
      }
    }
  }
}
search_btn.addEventListener("click", startSearch);
input_text.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) startSearch();
});
input_text.addEventListener("input", (e) => {
  if (e.target.value.length > 0) {
    cancel_btn.style.visibility = "visible";
  } else {
    cancel_btn.style.visibility = "hidden";
  }
});

cancel_btn.addEventListener("click", () => {
  input_text.value = "";
  cancel_btn.style.visibility = "hidden";
  input_text.focus();
});

async function getImages(value) {
  address = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f8bc164bb2384a8dab17f91fbbe83402&tags=${value}&per_page=450&sort=relevance&format=json&nojsoncallback=1`;

  console.log(address);
  try {
    const responce = await fetch(address);
    const data = await responce.json();
    console.log(data);
    fillGallery(data, 30);
  } catch (error) {
    console.log(error);
    alert("Not a valid search word!");
    input_text.value = "";
  }
}
function startSearch() {
  if (input_text.value.length > 0) {
    let value = input_text.value.split(" ").join(",");
    getImages(value);
  }
}
getImages(word);
