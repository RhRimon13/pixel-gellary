const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {

    imagesArea.style.display = 'block';
    gallery.innerHTML = '';
    // show gallery title
    galleryHeader.style.display = 'flex';
    images.forEach(image => {
        let div = document.createElement('div');
        div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
        div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
        gallery.appendChild(div)
    })
    spinner();

}

const getImages = (query) => {

    if (query != '') {
        const URL = `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`;
        spinner();
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                showImages(data.hits)
                console.log(data);
            })
            .catch(err => console.log(err))
    } else {
        swal({
            text: "Give a Valid Input.",
            icon: "warning",
            button: "Go Back",
        });
    }

}

let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    element.classList.toggle('added');

    let item = sliders.indexOf(img);
    item === -1
    sliders.push(img);

    // let item = sliders.indexOf(img);
    // if (item === -1) {
    //     sliders.push(img);
    // } else {
    //     alert('Hey, Already added !')
    // }
}
var timer
const createSlider = () => {
    // check slider image length
    if (sliders.length < 2) {
        swal({
            text: "Select More Than One Image.",
            icon: "warning",
            button: "Go Back",
        });
        return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext);
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    const duration = document.getElementById('duration').value;
    if (duration > 0) {
        sliders.forEach(slide => {
            let item = document.createElement('div')
            item.className = "slider-item";
            item.innerHTML = `
            <div>
            <img class="w-100" src="${slide}" alt="">
            </div>
            `;
            sliderContainer.appendChild(item);

        })
        changeSlide(0)
        timer = setInterval(function() {
            slideIndex++;
            changeSlide(slideIndex);
        }, duration);
    } else {
        swal({
            text: "Provide Positive Number.",
            icon: "warning",
            button: "Go Back",
        });
    }
}

// change slider index 
const changeItem = index => {
    changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {
    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }

    items.forEach(item => {
        item.style.display = "none"
    })

    items[index].style.display = "block"

}

searchBtn.addEventListener('click', function() {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
})

document.getElementById('search').addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
})

sliderBtn.addEventListener('click', function() {
    createSlider();
})
const spinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('d-none');
}