
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/home/home.js';
import { Nav } from './components/navbar/navbar.js';
import { Panier } from './components/panier/panier.js';
import { Shop } from './components/shop/shop.js';
import data from './data/data.json';

const originalData = { boissons: data.boissons };

export const App = () => {
  const [argent, setArgent] = useState(15);
  const [panier, setPanier] = useState([]);
  const [unite, setUnite] = useState(0);
  const [produit, setProduit] = useState(originalData.boissons);

 

  const addToCart = (id) => {
    const productToAdd = produit.find((p) => p.id === id);
    const updatedPanier = [...panier];
    const existingProductIndex = updatedPanier.findIndex((p) => p.id === id);

    if (argent < productToAdd.prix) {
      alert("Vous n'avez pas assez d'argent pour effectuer cet achat.");
      return;
    }

    if (existingProductIndex !== -1) {
      updatedPanier[existingProductIndex].unite += 1;
    } else {
      updatedPanier.push({ ...productToAdd, unite: 1 });
    }

    const updatedProduit = produit.map((p) => {
      if (p.id === id) {
        return { ...p, unite: p.unite - 1 };
      }
      return p;
    });

    setPanier(updatedPanier);
    setProduit(updatedProduit);
    setArgent(argent - productToAdd.prix);
    setUnite(unite + 1);
  };

  const removeFromCart = (id) => {
    const updatedPanier = [...panier];
    const existingProductIndex = updatedPanier.findIndex((p) => p.id === id);
    const existingProduct = updatedPanier[existingProductIndex];

    if (existingProduct.unite === 1) {
      updatedPanier.splice(existingProductIndex, 1);
    } else {
      updatedPanier[existingProductIndex].unite -= 1;
    }

    const updatedProduit = produit.map((p) => {
      if (p.id === id) {
        return { ...p, unite: p.unite + 1 };
      }
      return p;
    });

    setPanier(updatedPanier);
    setProduit(updatedProduit);
    setArgent(argent + existingProduct.prix);
    setUnite(unite - 1);
  };
 
    
  return (
    <div className="container">
      <Nav argent={argent} quantity={panier.length} unite={unite} panier={panier} />

      <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop addToCart={addToCart} produit={produit} />} />
    <Route
      path="/panier"
      element={<Panier panier={panier} unite={unite} removeFromCart={removeFromCart} />}
    />
  </Routes>

</div>
  );
};