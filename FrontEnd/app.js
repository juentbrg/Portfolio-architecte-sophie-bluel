//Adding works elements dynamically
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((arrayWorks) => {
    createWork(arrayWorks);
  });

fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((arrayFilter) => {
    createFilter(arrayFilter);
  });

const createWork = (array) => {
  array.forEach((element) => {
    let figure = document.createElement("figure");
    figure.setAttribute("data-filter", element.category.id);
    figure.classList.add("cards");
    document.querySelector(".gallery").appendChild(figure);
    let img = document.createElement("img");
    img.src = element.imageUrl;
    img.crossOrigin = "anonymous";
    figure.appendChild(img);
    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = element.title;
    figure.appendChild(figcaption);
  });
};

const createFilter = (array) => {
  array.forEach((element) => {
    let filterContainer = document.querySelector(".filters");
    let filter = document.createElement("button");
    filter.innerHTML = element.name;
    filter.classList.add("filter");
    filter.setAttribute("data-filter", element.id);
    filterContainer.appendChild(filter);
  });
  const buttons = document.querySelectorAll("button.filter");
  buttons.forEach((button) => {
    button.addEventListener("click", filterCategory);
    button.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active");
      button.classList.add("active");
    });
  });
};

const filterCategory = (event) => {
  let dataFilter = event.target.getAttribute("data-filter");
  let figures = document.querySelectorAll(".cards");

  if (dataFilter === "0") {
    figures.forEach((figure) => figure.classList.remove("hide"));
  } else {
    figures.forEach((figure) => {
      if (figure.getAttribute("data-filter") === dataFilter) {
        figure.classList.remove("hide");
      } else {
        figure.classList.add("hide");
      }
    });
  }
};
//Adding end

//Login
const form = document.querySelector("#signInForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = document.querySelector("#email").value;
  const passwordValue = document.querySelector("#password").value;
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let token = data.token;
      console.log(token);
      if (data.userId == undefined) {
        let error = document.querySelector(".error");
        error.innerText = "Adresse email ou mot de passe incorrect";
      } else {
        document.location.href = "index.html";
      }
    })
    .catch((err) => {});
});
//Login End
