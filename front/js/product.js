
// recuperer article http://localhost:3000/api/products/
const searchParams = new URL(document.location.href).searchParams;

// Fonction auto appelé , à executer immédiatement.
(async () => {
	const articleId = searchParams.get("id");
	const articleData = await getArticleData(articleId);
	if (typeof articleData === "object") {
		// Vérification serveur
		displayArticle(articleData);
	}
})();

// Récupération des données via l'api.
function getArticleData(articleId) {
	return fetch("http://localhost:3000/api/products/" + articleId)
		.then(function (response) {
			console.log(response);
			return response.json(); // Réponse de API.
		})
		.then(function (article) {
			return article; // Valeur du précédent return json.
		})
		.catch((err) => {
			console.error("err", err);
		});
}

// Construction/remplir de la page de l'article.
function displayArticle(articleData) {
	let articleImg = document.createElement("img");
	articleImg.src = articleData.imageUrl;
	articleImg.alt = articleData.altTxt;
	document.querySelector(".item__img").append(articleImg);

	// Ajout du contenu à l'élément.
	document.querySelector("#title").textContent = articleData.name;
	document.querySelector("#description").textContent = articleData.description;
	document.querySelector("#price").textContent = articleData.price;
	stockdataPrice = articleData.price;

	// Boucle pour récupérer les couleurs.
	for (let i = 0; i < articleData.colors.length; i++) {
		let option = document.createElement("option");
		option.text = articleData.colors[i];
		option.value = articleData.colors[i];
		document.querySelector("select").append(option);
	}
}
