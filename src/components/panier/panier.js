import React from 'react';

//importation du style 
import './css/panier.css';

//composant Panier avec props
export const Panier = (props) => {

  //fonction supprimer
  const supprimer = (id) => {
    //trouve le produit à supprimer  dans le panier grace à l'id
    const produitASupprimer = props.panier.find((p) => p.id === id);
    //nouveau panier avec les produits mis à jour
    const nouveauPanier = props.panier.map((p) => {
      if (p.id === id) {
        //diminue la quantité du produit 
        return { ...p, unite: p.unite - 1 };
      } else {
        return p;
      }
    }).filter((p) => p.unite > 0);// enleve du panier les produit qui ont une quantité de 0
  
    props.setPanier(nouveauPanier);//met à jour le panier
  
    // Trouve le produit associé dans la liste des produits
    const produitAMettreAJour = props.produit.find((p) => p.id === id);
    if (produitAMettreAJour) {
      const quantiteSupprimee = 1;

      // Augmente la quantité du produit dans la liste des produit
      const nouveauProduit = { ...produitAMettreAJour, unite: produitAMettreAJour.unite + quantiteSupprimee };
      // Crée une nouvelle liste des produits avec le produit mis à jour
      const nouveauxProduit = props.produit.map((p) => p.id === id ? nouveauProduit : p);
      // Met à jour la liste des produits
      props.setProduit(nouveauxProduit);
    }
  
    // l'état des unités et de l'argent après la suppression du produit
    const uniteApresSuppression = props.unite - 1; // Diminue le nombre d'unités de 1
    const argentApresSuppression = props.argent + produitASupprimer.prix; // Augmente le montant d'argent 
    props.setUnite(uniteApresSuppression); // Met à jour le nombre d'unités
    props.setArgent(argentApresSuppression); // Met à jour le montant d'argent
  };
  
  return (
    <div className="panier"> 
      <h2>Mon panier</h2> 
      <ul> 
        {props.panier.map((produit) => ( 
          <li key={produit.id}>
            <div className="produit">
              <div className="produitImg">
                <img src={produit.image} alt={produit.nom} /> 
              </div>
              <div className="produitInfo">
                <h3 className='nom'>{produit.nom}</h3>
                <p className='prix'>Prix: {produit.prix}€</p> 
                <p className='quantite' >Quantité: {produit.unite}</p>
                {/* bouton pour supprmer quantité */}
                <button onClick={() => supprimer(produit.id)}>Supprimer</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="panierTotal">
        <p>Total: {props.panier.reduce((total, produit) => total + produit.prix * produit.unite, 0)}€</p>
        <p>Quantité totale: {props.panier.reduce((total, produit) => total + produit.unite, 0)}</p>
      </div>
    </div>
  );
};