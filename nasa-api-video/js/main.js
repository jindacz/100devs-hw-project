//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector("button").addEventListener("click", getFetch);
let item = "";

function getFetch() {
	const choice = "&date=" + document.querySelector("input").value;
	const url =
		"https://api.nasa.gov/planetary/apod?api_key=23bEnTQTiibWaB5Ka6U6mnLlXGCINTPVugPtNkpi" +
		choice;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			item = data;
			update(item)
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

function update(item) {
	let img = document.querySelector("img");
	let vid = document.querySelector("iframe");

	document.querySelector("h2").textContent = item.title;
	document.querySelector("#description").textContent = item.explanation;

	if (item.media_type == "image") {
		img.src = item.hdurl;
		img.style.display = "block";
		vid.style.display = "none";
	} else if (item.media_type == "video") {
		vid.src = item.url;
		vid.style.display = "block";
		img.style.display = "none";
	}
}
