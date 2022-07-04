function autoUpdate() {

	const debounce = (func, wait, immediate) => {
		let timeout
	  
		return function() {
		  const context = this, args = arguments
		  const later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		  }
	  
		  const callNow = immediate && !timeout
		  clearTimeout(timeout)
		  timeout = setTimeout(later, wait)
		  if (callNow) func.apply(context, args)
		}
	  }
	
	document.getElementById('poetryName').addEventListener('input', debounce(() => {
		console.log(poetryName.value);
		showPoetries(poetryName.value);
	  }, 500))
}

async function showPoetries(poetryName) {

	console.log("test");

    document.getElementById("main").innerHTML = "<p>Učitavamo podatke...</p>";
    let result = await fetch(
      `https://poetrydb.org/title/${poetryName}`
    );
    result = await result.json();

    if (result.length === 0) {
		main.innerHTML = "<p>Nema rezultata za vaš upit! Pokušajte neki novi upit.</p>";
	}
      
    else {
		main.innerHTML = "";
		result.forEach(element => {
			console.log(element.author);
			displayPoetry(element);
		});
	} 

}


function displayPoetry(element) {

	const el = document.createElement("div");
	const flex = document.createElement("div");
	const showName = document.createElement("h3");
	const showTitle = document.createElement("h2");
	const showLines = document.createElement("p");


	showName.innerHTML = element.author;
	showTitle.innerHTML = element.title;
	showLines.innerHTML = element.lines;

	el.style.display = "flex";

	flex.appendChild(showTitle);
	flex.appendChild(showName);
	flex.appendChild(showLines);

	el.appendChild(flex);

	document.getElementById("main").appendChild(el);

}