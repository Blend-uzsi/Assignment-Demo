//State & elements 
const list = document.getElementById("items");
const out  = document.getElementById("out");
let items = [];

// Theme: init from storage
(function initTheme(){
  const saved = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", saved || "dark");
})();

//Render list
function render(){
  list.innerHTML = "";
  items.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${t}`;
    list.appendChild(li);
  });
}

//Events 
document.getElementById("addItem").addEventListener("click", () => {
  items.push("Item " + (items.length + 1));
  render();
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

//Simulated fetch 
function fakeFetch(){
  return new Promise(res =>
    setTimeout(() => res([
      { id: 1, name: "Pen" },
      { id: 2, name: "Pad" },
      { id: 3, name: "Paper" }
    ]), 500)
  );
}

document.getElementById("load").addEventListener("click", async () => {
  out.textContent = "> GET /api/products\n";
  try {
    const data = await fakeFetch();
    out.textContent += "< 200 OK\n" + JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent += "! " + err.message;
  }
});
