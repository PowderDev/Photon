const auth = '563492ad6f9170000100000190b0e5f69e6844c7afe5e71672c828d4',
      gallery = document.querySelector('.gallery'),
      searchInput = document.querySelector('.search-input'),
      form = document.querySelector('.search-form'),
      moreBtn = document.querySelector('.more');
let searchValue;
let currentSearch;
let fetchLink;
let loadpic = 15;

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchPhoto(searchValue)
    moreBtn.style.display = 'none';
})

moreBtn.addEventListener('click', loadMore)



function updateInput(e){
    searchValue = e.target.value;
    currentSearch = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        },
    });
    
    const data = await dataFetch.json();
    return data;
}

function generatePict(data){
    data.photos.forEach(photo =>{
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-image');
        galleryImg.innerHTML = `
        <div class='gallery-info'>
            <p><a href="${photo.photographer_url}">${photo.photographer}</a></p>
            <a href="${photo.src.original}" download >Download</a>
        </div>
        <img src='${photo.src.large}'></img>
        `;
        gallery.appendChild(galleryImg);
    });
};



async function curatedPhotos(){

    fetchLink = `https://api.pexels.com/v1/curated/?page=${1 + Math.random() * 25}&per_page=25`
    const data = await fetchApi(fetchLink); 
    generatePict(data);
    moreBtn.style.display = 'block';
};

async function searchPhoto(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&page=${1 + Math.random() * 25}&per_page=25`
    const data = await fetchApi(fetchLink);
    generatePict(data);
    moreBtn.style.display = 'block';
};

function clear (){
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore(){

    if(searchValue){
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&page=${1 + Math.random() * 25}&per_page=${loadpic}`; 
    }else{
        fetchLink = `https://api.pexels.com/v1/curated/?page=${1 + Math.random() * 25}&per_page=${loadpic}`;
    }

    const data = await fetchApi(fetchLink);
    generatePict(data);

}






curatedPhotos();