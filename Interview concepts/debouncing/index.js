document.getElementById("search").addEventListener("input", (e) => {
  if (window.timer) {
    clearTimeout(timer);
  }
  window.timer = setTimeout(() => {
    demoApi(e.target.value);
  }, 3000);
});

function demoApi(value) {
  console.log(value);
}
