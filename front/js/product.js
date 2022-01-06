// Faire le lien entre un produit de la page d’accueil et la page Produit
function getArticleId() {
    console.log("exécution de la fonction")
	// Récupérer l’id du produit à afficher
    return new URLSearchParams(window.location.search).get("id");
}
const id = getArticleId()

// Insérer un produit et ses détails dans la page Produit
const productUrl = `http://localhost:3000/api/products/${id}`;
fetch(productUrl)
    .then((res) => res.json())
    .then((product) => {
		console.log(product)
        // Affichage de l'image du produit
        let img = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
        const image = document.getElementById("itemImg");
        image.innerHTML = img

        // Affichage du nom du produit
        let nom = `${product.name}`
        const name = document.getElementById("title");
        name.innerHTML = nom

        // Affichage du prix du produit
        let prix = `${product.price}`
        const price = document.getElementById("price");
        price.innerHTML = prix

        // Affichage de la description du produit
        let descrip = `${product.description}`
        const description = document.getElementById("description");
        description.innerHTML = descrip

        // Affichage des couleurs disponibles du produit
        console.log(product.colors)
        let select = document.getElementById("colors");
        console.log(select)
        product.colors.forEach(color => {
            select.innerHTML += `<option value=${color}>${color}</option>`;
        });
    })

                    //Gestion du panier

let creationProduit = () => {
	let quantite = document.querySelector('#quantity')
	console.log(quantite)
	let name = document.querySelector("#title").innerText
	let prix = document.querySelector("#price").innerText
	let image = document.querySelector("#itemImg img")

	let optionProduct = {
		_id: id,
		quantity: Number(quantite.value),
		colors: colors.value,
		nom: name,
		prix: Number(prix),
		img: image.src,
		alt: image.alt
	}

	// Mettre le produit dans le localstorage
	let sauvegardeProduitLocalStorage = JSON.parse(localStorage.getItem('product'))

	// Ajoute un produit sélectionné dans le localStorage
	let ajoutProduitLocalStorage = () => {
		sauvegardeProduitLocalStorage.push(optionProduct)
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
	}

	// Modifie un produit sélectionné dans le localStorage
	let modifProductLocalStorage = (index) => {
		sauvegardeProduitLocalStorage[index].quantity = optionProduct.quantity
		localStorage.setItem('product', JSON.stringify(sauvegardeProduitLocalStorage))
	}

		// SI pas de produit dans le localStorage, crée le tableau et ajoute le produit
		if (!sauvegardeProduitLocalStorage) {
			sauvegardeProduitLocalStorage = []
			ajoutProduitLocalStorage()
			cart()
		}
		// Trouve l'index dans le localStorage qui a la même couleur & la même ID que la sélection actuelle
		else {
			let index = sauvegardeProduitLocalStorage.findIndex(
				(e) => e.colors === optionProduct.colors && e._id === optionProduct._id
			)
			// SI le produit existe déjà, modifie la quantité
			if (index !== -1) {
				modifProductLocalStorage(index)
				cart()
			}
			// SINON ajoute le produit
			else {
				ajoutProduitLocalStorage()
				console.log('Ajouter le produit')
				cart()
			}
		}
}

let envoiePanier = document.querySelector('#addToCart')
envoiePanier.addEventListener('click', (event) => {
	creationProduit()
})

// Rajouter la quantité totale à côté du panier (nav)
let cart = () => {
	let panier = document
		.getElementsByTagName('nav')[0]
		.getElementsByTagName('li')[1]
	let sauvegardeProduitLocalStorage = [] = JSON.parse(localStorage.getItem('product'))
	let somme = 0

	for (let q in sauvegardeProduitLocalStorage = []) {
		let loop = parseInt(sauvegardeProduitLocalStorage = []
			[q].quantity)
		somme += loop
	}

	panier.innerHTML = `Panier <span id="test" style='color: red;'>${somme}</span>`
}