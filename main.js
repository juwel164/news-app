// //  const apiKey = '77b4cd2e2fc74988a4fa0f0d28484754'


// //  const cardSection = document.getElementsByClassName('card-section')

// //  async function fetchRandomNews(){
// //   try{
// //     const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`
// //     const response =  await fetch(apiUrl)
// //     const data = await response.json()
// //     return data.articles
// //   }catch(error){
// //     console.error('Error fetching random news', error)
// //     return[]
// //   }
// //  }

// // function displayBlogs(articles){
// //   cardSection.innerHTML = ""
// //   articles.forEach((article) => {
// //     const blogCard = document.createElement('div')
// //     blogCard.classList.add('blog-card')
// //     const img = document.createElement('img')
// //     img.src = article.urlToImage //api doc.
// //     img.alt = article.tittle
// //     const tittle = document.createElement('h2')
// //     tittle.textContent = article.tittle
// //     const description = document.createElement('p')
// //     description.textContent = article.description
    
// //     blogCard.appendChild(img)
// //     blogCard.appendChild(tittle)
// //     blogCard.appendChild(description)
// //     cardSection.appendChild(blogCard)
// //   })
// // }


// //  (async ()=>{
// //   try{
// //     const articles = await fetchRandomNews()
// //     displayBlogs(articles)
// //   }catch(error){
// //     console.error('Error fetcheing random news', error);
// //   }
// //  })();


// const apiKey = '77b4cd2e2fc74988a4fa0f0d28484754';

// const cardSection = document.querySelector('.card-section');

// async function fetchRandomNews() {
//   try {
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data.articles;
//   } catch (error) {
//     console.error('Error fetching random news', error);
//     return [];
//   }
// }

// function displayBlogs(articles) {
//   cardSection.innerHTML = "";
//   articles.forEach((article) => {
//     const blogCard = document.createElement('div');
//     blogCard.classList.add('blog-card');

//     const img = document.createElement('img');
//     if (article.urlToImage) {
//       img.src = article.urlToImage; // api doc.
//     } else {
//       img.src = 'default-image-path.jpg'; // Provide a default image path if urlToImage is null
//     }
//     img.alt = article.title;

//     const title = document.createElement('h2');
//     title.textContent = article.title;

//     const description = document.createElement('p');
//     description.textContent = article.description;

//     blogCard.appendChild(img);
//     blogCard.appendChild(title);
//     blogCard.appendChild(description);

//     cardSection.appendChild(blogCard);
//   });
// }

// (async () => {
//   try {
//     const articles = await fetchRandomNews();
//     displayBlogs(articles);
//   } catch (error) {
//     console.error('Error fetching random news', error);
//   }
// })();



const apiKey = '77b4cd2e2fc74988a4fa0f0d28484754';

const cardSection = document.querySelector('.card-section');
const searchFeild = document.getElementById("search-input")
const searchButton = document.getElementById("search-btn")

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching random news', error);
    return [];
  }
}



searchButton.addEventListener("click", async ()=>{
  const query = searchFeild.value.trim()
  if(query !== ""){
    try{
      const articles = await fetchNewsQuery(query)
      displayBlogs(articles)
    }catch(error){
      console.log('Error fetching data by query', error)
    }
  }
})


async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching random news', error);
    return [];
  }
}




function displayBlogs(articles) {
  cardSection.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');

    const img = document.createElement('img');
    if (article.urlToImage) {
      img.src = article.urlToImage;
    } else {
      img.src = 'img/fff.png'; // Provide a valid default image path
    }
    img.alt = article.title || 'No title available';

    const title = document.createElement('h2');
    const truncatedTitle = article.title ? (article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title) : 'No title available';
    title.textContent = truncatedTitle;

    const description = document.createElement('p');
    const truncatedDesc = article.description ? (article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description) : 'No description available';
    description.textContent = truncatedDesc;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", ()=>{
      window.open(article.url, "_blank")
    }) 
    cardSection.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error('Error fetching random news', error);
  }
})();
