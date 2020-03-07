// Pseudo Code: Meme Generator
// Container for an image, input fields
// Connected to some sort of search API
// Search function so user can select image.
// User selects image
// User inputs text in text fields to insert text onto image
// User selects where text over lays on image

// image search api
const apiURL = "https://pixabay.com/api/";
const apiKEY = "15298779-71baa10b8ee7928b86c7fe268";

// Connect to API with key and SearchTerm
const fetchData = async searchTerm => {
  const response = await axios.get(apiURL, {
    params: {
      key: apiKEY,
      q: searchTerm
    }
  });

  return response.data.hits;
};

// Search function
const onInput = async e => {
  const images = await fetchData(e.target.value);

  results.innerHTML = "";
  for (let image of images) {
    const option = document.createElement("a");
    option.addEventListener("click", selectImage);
    option.innerHTML = `<a href="#">
    <img src="${image.previewURL}" class='img-fluid p-2 image' alt="Responsive image"/></a>`;

    option.addEventListener("click", () => {
      selectImage(image);
    });

    results.appendChild(option);
  }
};

// Search with debounce function so ap isn't called on every character.
search.addEventListener("input", debounce(onInput, 500));

// dom selectors
const uploadImg = document.querySelector("#upload");
const upperText = document.querySelector("#topLineText");
const lowerText = document.querySelector("#bottomLineText");
const generateBTN = document.querySelector("#generate");
const results = document.querySelector(".results");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Displays image to DOM when selected
const selectImage = image => {
  let src = image.largeImageURL;
  loadAndDrawImage(src, upperText, lowerText);
};

// Loads and Draws image for CANVAS element
const loadAndDrawImage = (src, upperText, lowerText) => {
  const image = new Image();

  //Sets convas size to selected image
  image.onload = () => {
    context.canvas.width = image.width;
    context.canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    // font styles
    context.font = "100px Impact";
    context.textAlign = "center";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.fillStyle = "white";

    if (upperText.value != null) {
      context.fillText(upperText.value, canvas.width / 2, 90);
      context.strokeText(upperText.value, canvas.width / 2, 90);
    }

    if (lowerText.value != null) {
      context.fillText(lowerText.value, canvas.width / 2, canvas.height - 20);
      context.strokeText(lowerText.value, canvas.width / 2, canvas.height - 20);
    }
  };

  image.src = src;
};



// Generates MEME

const generateMeme = () => {};

function greet() {
  console.log("hi");
}

function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  loadAndDrawImage(src, window.topLineText, window.bottomLineText);
}

generateBTN.addEventListener("click", function() {
  let reader = new FileReader();
  reader.onload = function() {
    let loadedImg = new Image();
    loadedImg.src = reader.result;
    console.log(upperText.value)
    loadAndDrawImage(loadedImg.src, upperText, lowerText);
  };
  reader.readAsDataURL(uploadImg.files[0]);
});




