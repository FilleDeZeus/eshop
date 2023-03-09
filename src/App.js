
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';

//importation du style
import './App.css';
//importations des composant 
import { Home } from './components/home/home.js';
import { Navbar } from './components/navbar/navbar.js';
import { Panier } from './components/panier/panier.js';
import { Shop } from './components/shop/shop.js';
import data from './data/data.json';

//ciblage des data boissons du jsoon
const boissons = data.boissons ;

//composant App
export const App = () => {
  //les etats de ce composant
  const [argent, setArgent] = useState(15); //etat de l'argent
  const [panier, setPanier] = useState([]); //etat du panier
  const [unite, setUnite] = useState(0); //etat unite 
  const [produit, setProduit] = useState(boissons); //etat des boissons

  //l'ensemble des routes 
  let routes = useRoutes ([
    {
      path : "/",
      element : <Home />
    },
    {
      path : "/shop", 
      element : <Shop setProduit={setProduit} setPanier={setPanier} setArgent={setArgent} setUnite={setUnite}  produit={produit} argent={argent} panier={panier} unite={unite}  />
    },
    {
      path : "/panier",
      element : <Panier setProduit={setProduit} setPanier={setPanier} setArgent={setArgent} setUnite={setUnite}  produit={produit} argent={argent} panier={panier} unite={unite}  />
    }

  ])
    
  return (
    <div className="container">
      {/* compo navbar et ses props */}
      <Navbar argent={argent} unite={unite} panier={panier} />
      {/* affichage des routes */}
      {routes}
</div>
  );
};