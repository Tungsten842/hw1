function changeimg(event) {
  console.log(event.src);
    event.src = "img/musk2.jpg"
}


function add_piece() {
  let element = document.querySelector('.right-featured-stuff');

  let el = document.createElement("div");
  let text = document.createTextNode("Enterprise");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item-title');
  element.appendChild(el);

  el = document.createElement("h3");
  text = document.createTextNode("The market is forcing cloud vendors to relax data egress fees");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item');
  element.appendChild(el);

  el = document.createElement("div");
  text = document.createTextNode("Ron Miller");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-author');
  element.appendChild(el);
}

function toggle_bar(event) {
  const left_bar = document.querySelector('.left-bar');
  const element = document.querySelector('.content');
  if ( left_bar.style.display !== 'none' ) {
    left_bar.style.display = 'none';
    element.style.marginLeft = "30px";
  }
  else {
    left_bar.style.display = 'flex';
    element.style.marginLeft = "210px";
  }
}
const element = document.querySelector('*');
element.addEventListener("keydown",(event) => {
  if (event.key === "t") {
    toggle_bar(event);
  }
  if (event.key === "a") {
    add_piece(event);
  }
});
addEventListener("mouseover", (event) => {});
