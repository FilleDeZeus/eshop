import React, { useState } from 'react';
import './css/shop.css';

export const Shop = ({ addToCart, produit }) => {
  const [products, setProducts] = useState(produit);

  const handleAddToCart = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = { ...product, unite: product.unite - 1 };
        if (updatedProduct.unite === 0) {
          updatedProduct.button = 'disabled';
          updatedProduct.stock = 'Rupture de stock';
        }
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    addToCart(id);
  };

  const handleReset = () => {
    localStorage.clear();
    setProducts(produit);
    window.location.reload();
  };

  return (
    <div className="shop">
      <div className="card">
        {products.map((produit) => (
          <div key={produit.id} className={`produit ${produit.unite === 0 ? 'stock-empty' : produit.unite === 1 ? 'last' : ''}`}>
            <div>
              <img className="img" src={produit.image} alt={produit.nom} />
            </div>
            <div className="description">
              <h2>{produit.nom}</h2>
              <p>Stock : {produit.unite} unité</p>
              <p>Prix : {produit.prix}€</p>
            </div>
            <div className="text">
              {produit.unite === 0 ? (
                <p className="stock">{produit.stock}</p>
              ) : (
                <button
                  className={`${produit.button} co`}
                  onClick={() => handleAddToCart(produit.id)}
                >
                  Ajouter au panier
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={handleReset}>Reset All</button>
      </div>
    </div>
  );
};