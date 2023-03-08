import React from 'react';
import './css/panier.css'
export const Panier = ({ panier, unite, removeFromCart }) => {
  const handleSupp = (produit) => {
    removeFromCart(produit.id);
  };

  return (
    <div className="panier">
      <h2>Mon panier</h2>
      <ul>
        {panier.map((produit) => (
          <li key={produit.id}>
            <div className="produits">
              <div className="produit-img">
                <img src={produit.image} alt={produit.nom} />
              </div>
              <div className="produit-info">
                <h3 className='nom'>{produit.nom}</h3>
                <p className='prix'>Prix: {produit.prix}€</p>
                <p className='quantite' >Quantité: {produit.unite}</p>
                <button onClick={() => handleSupp(produit)}>Supprimer</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="panier-total">
        <p>Total: {panier.reduce((total, produit) => total + produit.prix * produit.unite, 0)}€</p>
        <p>Quantité totale: {unite}</p>
      </div>
    </div>
  );
};