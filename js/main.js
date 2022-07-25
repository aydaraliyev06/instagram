let btnBurger = document.querySelector(".btnBurger");
let burgerClose = document.querySelector(".burgerClose");
let API = "http://localhost:8000/todom";
let searchValue = "";
let currentPage = 1;

btnBurger.addEventListener('click', ()=>{
    let burgerMenu = document.querySelector(".burgerMenu").style.display='flex';
});

burgerClose.addEventListener('click', ()=>{
    let burgerMenu = document.querySelector(".burgerMenu").style.display='none';
});
try{
    let inpAddImg = document.querySelector("#inpAddImg");
    let inpAddText = document.querySelector("#inpAddText");
    let btnAdd = document.querySelector(".btnAdd");

    btnAdd.addEventListener('click', ()=>{
        if (
            !inpAddImg.value.trim() ||
            !inpAddText.value.trim() 
        ){
            alert("Error, please enter all inputs");
            return;
        }
        let newPost = {
            tripText: inpAddText.value,
            tripImg: inpAddImg.value,
            tripLike: 0,
            tripComment: {}
        }
        createPost(newPost);
        // readPost();
    });
}catch{}

function createPost(tripObj){
    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "appLication/json; charset=utf-8",
        },
        body: JSON.stringify(tripObj)
    });
    inpAddImg.value = "";
    inpAddText.value = "";
};

let section = document.querySelector(".section1-box");
console.log(section);

let poxLike = 0;

function readPost() {
  fetch(`${API}?q=${searchValue}&_page=${currentPage}`) // получение данных из db.json
    .then((res) => res.json())
    .then((data) => {
      section.innerHTML = ""; // очищаем наш тег section, чтобы не было дубликатов
      data.forEach((item) => {
        // перебираем наш полученный массив с объектами
        // добаляем в наш тег section верстку при каждом цикле
        section.innerHTML += ` 
          <div class="post">
            <div class="postNavbar">
                <img class="navbarIcon" src="" alt="iconNavbar">
                <button id="${item.id}" class="deleteBtn"></button>
            </div>
            <img class="imgPost" src="${item.tripImg}" alt="Post">
            <div class="iconPost-box">
                <div class="iconPost">
                    <button class="postLike"></button>
                    <button class="postComment"></button>
                </div>
                <p class="postLikeNum">Likes: ${poxLike}</p>
                <p class="postText">${item.tripText}</p>
            </div>
          </div>
          `;
      });
    });
}

document.addEventListener("click", (e) => {
    let del_class = [...e.target.classList];
    if (del_class.includes("postLike")){
        poxLike += 1;
        readPost()
    }
})

document.addEventListener("click", (e) => {
  // с помощью объекта event ищем id нашего элемента
  let del_class = [...e.target.classList]; // Сохраняем массив с классами в переменную
  if (del_class.includes("deleteBtn")) {
    // проверяем, есть ли в нашем поиске наш класс btnDelete
    let del_id = e.target.id; // сохраняем id элемента, по которому кликнули
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readPost()); // вызываем функцию отображения данных, для того чтобы всё переотобразилось сразу же после удаления одной книги
  }
});

function deletePost(tripObj){
    fetch(API, {
        method: "DELETE", 
    })
}

readPost();

