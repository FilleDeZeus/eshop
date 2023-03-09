import React, { useState } from 'react';
//importation du style 
import './css/shop.css';

// Composant Shop 
export const Shop = (props) => {
  
  // état listeproduits 
  const [listeproduits, setListeProduits] = useState(props.produit);

  // fonction Ajouter au panier
  const ajouterAuPanier = (id) => {
    const produitAAjouter = listeproduits.map((product) => {
      if (product.id === id && product.unite > 0) {
        const nouveauProduit = { ...product, unite: product.unite - 1 };
        if (nouveauProduit.unite === 0) {
          nouveauProduit.button = 'disabled';
          nouveauProduit.stock = 'Rupture de stock';
        }
        return nouveauProduit;
      }
      return product;
    });
    setListeProduits(produitAAjouter);
    addToCart(id);
  };

  const reinitialiser = () => {
    localStorage.clear();
    setListeProduits(props.produit);
    window.location.reload();
  };

  const addToCart = (id) => {
    const produitAAjouter = props.produit.find((p) => p.id === id);
    const nouveauPanier = [...props.panier];
    const produitExistant = nouveauPanier.findIndex((p) => p.id === id);
    // Vérifie que l'utilisateur a suffisamment d'argent pour acheter le produit
    if (props.argent < produitAAjouter.prix) {
      alert("Vous n'avez pas assez d'argent pour effectuer cet achat.");
      return;
    }

    if (produitExistant !== -1) {
      nouveauPanier[produitExistant].unite += 1;
    } else {
      nouveauPanier.push({ ...produitAAjouter, unite: 1 });
    }

    const updatedProduit = props.produit.map((p) => {
      if (p.id === id) {
        return { ...p, unite: p.unite - 1 };
      }
      return p;
    });

    props.setPanier(nouveauPanier);
    props.setProduit(updatedProduit);
    props.setArgent(props.argent - produitAAjouter.prix);
    props.setUnite(props.unite + 1);
  };

  return (
    <div className="shop">
      <div className="card">
        {listeproduits.map((product) => (
          <div key={product.id} className={`produit ${product.unite === 0 ? 'rupture' : product.unite === 1 ? 'dernier' : ''}`}>
            <div>
              <img className="img" src={product.image} alt={product.nom} />
            </div>
            <div className="description">
              <h2>{product.nom}</h2>
              <p>Stock : {product.unite} unité</p>
              <p>Prix : {product.prix}€</p>
            </div>
            <div className="text">
              {product.unite === 0 ? (
                <p className="stock">{product.stock}</p>
              ) : (
                <button
                  className={`${product.button} co`}
                  onClick={() => ajouterAuPanier(product.id)}
                  disabled={product.button === 'disabled'}
                >
                  Ajouter au panier
                </button>
              )}
            </div>
          </div>
        ))}
        <button className="reset" onClick={reinitialiser}>Reset All</button>
      </div>
    </div>
  );
};