function submit_generate(event) {
  var formData = new FormData();

  form = document.querySelector(".form-generate");
  for (let element of form.elements) {
    if (element.type !== "submit") {
      formData.append(element.name, element.value);
    }
  }
  generate_apis(formData);
  event.preventDefault();
}
async function generate_apis(formData) {
  const response = await fetch("serv/gen_text.php", {
    method: "POST",
    body: formData,
  });
  const text = await response.text();
  const rbox = document.querySelector(".text-result");
  //if (text.includes(""))
  rbox.textContent = text;
}
document.querySelector(".form-generate").addEventListener("submit", submit_generate);


