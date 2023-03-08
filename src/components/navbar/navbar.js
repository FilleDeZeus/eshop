import React from 'react'
import { Link } from 'react-router-dom'
import { Panier } from '../panier/panier.js'
import './css/navbar.css'

export const Nav = (props) => {
    return (

        <div className='navbar'>
            <div className='site'>E-Distrib</div>
            <div>
                <ul className='menu '>
                    <Link to="/" >Acceuil</Link>
                    <Link to="/shop">Produit</Link>
                    <Link to="/panier">Panier</Link>

                </ul>
            </div>
            <div className='achat'>
                <div>
                    <span>Mon argent: </span> {props.argent}€
                </div>
                <div id='log'> 
                    <i class="fa-solid fa-basket-shopping"></i>
                        <div id='panier'>
                            <Panier panier={props.panier} unite={props.unite}/> 
                        </div>
                    </div>
            </div>
        </div>
    )
}