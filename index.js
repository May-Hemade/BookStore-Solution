const url = "https://striveschool-api.herokuapp.com/books"

// first way to fetch

// const getBooks = () => {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.status)
//       }
//       return response.json()
//     })
//     .then((response) => {
//       let data = response
//       console.log(data)
//     })
// }
let data = []
let cart = []
// fetch with async

const asynBooks = async () => {
  try {
    let response = await fetch(url)
    if (response.ok) {
      data = await response.json()
      console.log(data)
      displayBooks()
      // since data is a global variable no need to pass it
    } else {
      console.log("no response")
    }
  } catch (error) {
    console.log(error)
  }
}

// ====> the foreach is just looping over like the for
// The forEach() method executes a provided function once for each array element.

//ex 2
let filter = ""
const displayBooks = () => {
  console.log(data)

  let filteredBooks = data
  if (filter.length >= 0) {
    filteredBooks = data.filter((book) =>
      book.title.toLowerCase().includes(filter.toLowerCase())
    )
  }

  rowNode.innerHTML = ""

  filteredBooks.forEach((book) => {
    rowNode.innerHTML += ` <div class="col col-lg-3 m-2">
      <div class="card card-main  shadow   bg-white rounded" style="" height="50px">
    <img class="card-img-top shadow " src="${book.img}" alt="Card image cap">
    <div class="card-body ">
      <p class="card-title main-card-title ">${book.title}</p>
      <p class="d-none asin">${book.asin}</p>
    
    </div>
    <div class="mb-2 d-flex justify-content-between w-80 p-2" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-outline-warning btn-sm "   onclick="removeBook(this)">Skip</button>
    <button type="button"  class="btn btn-outline-info btn-sm"  onclick="addToCart(this)">Add to cart</button>     
    </div>
  </div>`
  })
}

let titleCartNode = document.querySelector(".cart-title")
// ex 7

const searchBook = () => {
  let searchInputNode = document.querySelector(".search-input")
  searchInputNode.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 3 || e.target.value.length < filter.length) {
      filter = e.target.value
      displayBooks()
    }
  })
}

// search with search button
const searchButton = () => {
  let searchInputNode = document.querySelector(".search-input")
  console.log(searchInputNode)
  filter = searchInputNode.value
  displayBooks()
}

// const searchBook = () => {
//     let searchInputNode = document.querySelector(".search-input")
//     searchInputNode.addEventListener("keyup", (e) => {
//
//
//     let filter = e.target.value
//     if (filter.length >= 3) {
//       rowNode.innerHTML = ""
//       let filteredBooks = data.filter((book) =>
//         book.title.toLowerCase().includes(filter.toLowerCase())
//       )
//       filteredBooks.forEach((book) => {
//         rowNode.innerHTML += ` <div class="col col-lg-3 m-2">
//     <div class="card " style="" height="50px">
//   <img class="card-img-top " src="${book.img}" alt="Card image cap">
//   <div class="card-body ">
//     <h5 class="card-title text-truncate">${book.title}</h5>
//     <p class="d-none asin">${book.asin}</p>

//   </div>
//   <div class="mb-2 d-flex justify-content-between w-80 p-2" role="group" aria-label="Basic example">
//   <button type="button" class="btn btn-secondary btn-sm "   onclick="removeBook(this)">Skip</button>
//   <button type="button"  class="btn btn-primary btn-sm"  onclick="addToCart(this)">Add to cart</button>
//   </div>
// </div>`
//       })
//     }

searchBook()

// extra 2
const count = () => {
  let total = cart.reduce((accumulator, current) => ++accumulator, 0)
  titleCartNode.innerHTML = `Cart (${total})  <a type="button"  class="btn-sm"  onclick="deleteCart()">🗑️</a>  `

  console.log(total)
}

// const displayBooks = (data) => {
//   let rowNode = document.querySelector("#books")
//   for (let i = 0; i <= data.length; i++) {
//     rowNode.innerHTML += ` <div class="col col-lg-3 m-2">
//     <div class="card " style="" height="50px">
//   <img class="card-img-top " src="${data[i].img}" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title text-truncate">${data[i].title}</h5>

//     <a href="#" class="btn btn-primary">add to cart</a>
//   </div>
// </div>`
//   }
// }

let rowNode = document.querySelector("#books")
// ex 4
const addToCart = (button) => {
  let card = button.closest(".card")
  console.log(card)
  card.classList.add("border", "border-danger")
  let asin = card.querySelector(".asin").innerText

  let selectedBook = data.find((book) => book.asin === asin)
  cart.push(selectedBook)
  displayCart()
}
let cartRow = document.querySelector("#cart")
const displayCart = () => {
  cartRow.innerHTML = ""
  cart.forEach((item) => {
    cartRow.innerHTML += `<div class="row cart-row">
    <div class="col col-cart">
      <div class="card flex-row ">
      <img class="cart-image" src="${item.img}" alt="Card image cap">
        <div class="card-body">
          <h6 class="card-title">${item.title}</h6>
          <button type="button"  class="btn btn-outline-danger btn-sm"  onclick="removeBook(this)">X</button>
       
        </div>
      </div>
    </div>
  `
  })
  count()
}
// same function used for ex 6 and extra 1
const removeBook = (button) => {
  let card = button.closest(".col")
  card.classList.add("d-none")
}

// ====> the map changes from one array to another

// The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

// const displayBooks = (data) => {
//   console.log(data)
//   let rowNode = document.querySelector("#books")
//   data.map((book) => {
//     rowNode.innerHTML += ` <div class="col col-lg-3 m-2">
//       <div class="card " style="" height="50px">
//     <img class="card-img-top " src="${book.img}" alt="Card image cap">
//     <div class="card-body">
//       <h5 class="card-title text-truncate">${book.title}</h5>

//       <a href="#" class="btn btn-primary">add to cart</a>
//     </div>
//   </div>`
//   })
// }
// extra 3
const deleteCart = () => {
  cart = []
  displayCart()
}

window.onload = () => {
  //   getBooks()
  asynBooks()
}

// Explanation difference between MAP and FOREACH uncomment and check the console to see the difference

// const mapArr = () => {
//   let arr = ["some", "thing", "to", "learn"]
//   let arr2 = arr.map((word) => word.toLocaleUpperCase())
//   console.log(arr2)
//   //   ====> made to trasform an array to another so it will give you a new array
// }

// const foreachArr = () => {
//   let arr = ["some", "thing", "to", "learn"]
//   let arr2 = arr.forEach((word) => {
//     let upperCaseWord = word.toLocaleUpperCase()
//     console.log(upperCaseWord)
//   })
//   console.log(arr2)
//   //   ===> this doesn't return anything
// }
