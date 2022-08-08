
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
			// Si erreur de communication, la section article est cachée.
			document.querySelector("article").style.display = "none";

			// Création d'un <h2> poru afficher l'erreur.
			let newAlertH2 = document.createElement("h2");
			newAlertH2.textContent =
				"Erreur de communication avec le serveur. Merci de contacter : support@name.com";
			document.querySelector(".item").append(newAlertH2);
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

// 1° Écouter le click sur le bouton (ajouter au panier).
document.querySelector("#addToCart").addEventListener("click", () => {
	// je stock le retour de la fonction addData.
	let product = getDataDict();
	if (product.colors != "" && product.quantity != 0) {
		storeData(product);
	}
});
