import React, { useState } from "react";
import { EmojioneV4 } from "react-emoji-render";

// Composants de la page
import Header from "./components/Header";
import Details from "./components/Details";
import Footer from "./components/Footer";

function App() {
    const [loading, setLoading] = useState(false); // Les données se chargent-elles ?
    const [input, setInput] = useState(""); // Entrée de l'utilisateur pour la requête de la brasserie
    const [breweries, setBreweries] = useState([]); // Tableau des brasseries qui seront définies après la récupération
    const [emptyResult, setEmptyResult] = useState(false); // Le résultat de la récupération est-il vide ?

    /**
     * Recherchez les brasseries à partir de l'API Open Brewery DB et définissez ces résultats
     * à l'intérieur de l'état (brasseries).
     */
    const getBreweries = () => {
        fetch(`https://api.openbrewerydb.org/breweries?by_state=ohio&sort=type,name:asc&per_page=3/search?query=${input}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(true);
                setTimeout(function () {
                    // Si la réponse du tableau de données est vide
                    if (data.length < 1) {
                        setEmptyResult(true); // AUCUN résultat pour la requête
                    }
                    setBreweries(data); // Définissez le tableau des brasseries à partir de la réponse
                    setLoading(false); // Redéfinir l'état de chargement sur false
                }, 500);
            })
            .catch((error) => {
                console.error(error.message);
                alert("Une erreur s'est produite lors de la récupération des données");
            });
    };

    /**
     * Gérer l'effacement des résultats. Efface l'état pour
     * le tableau des brasseries, les résultats booléens et la chaîne d'entrée.
     */
    const handleClearingResults = () => {
        setBreweries([]);
        setEmptyResult(false);
        setInput("");
    };

    // Affichez les brasseries en tant qu'élément de liste par ordre alphabétique par nom de brasserie.
    const breweriesArr = breweries
        .sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        .map((brewery) => (
            <>
                <li
                    className='list-item'
                    key={brewery.id}
                    data-toggle='modal'
                    data-target={"#detailsModal_" + brewery.id}
                >
                    <div className='list-item-title'>
                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':beer:'
                        />
                        <h3>{brewery.name}</h3>
                    </div>
                    <div className='list-item-title'>
                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':round_pushpin:'
                        />
                        <p className='lead'>
                            {brewery.city + ", " + brewery.state}
                        </p>
                    </div>
                </li>
                {/* Afficher plus de détails sur la brasserie (adresse, numéro, site web) */}
                <Details brewery={brewery} />
            </>
        ));

    return (
        <>
            <Header />
            <main>
                <p className='text-center my-0'>
                    Rechercher votre brasserie préférer via la Recherche.
                </p>
                <div className='bar-de-recherche'>
                    <div className='input-group mb-0'>
                        <input
                            type='text'
                            value={input}
                            placeholder='Recherche de la brasserie...'
                            aria-label='Recherche'
                            className='form-control'
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className='btn btn-dark mx-1'
                            type='button'
                            id='button-addon1'
                            data-ripple-color='dark'
                            onClick={getBreweries}
                        >
                            Recherche
                        </button>
                        <button
                            className='btn btn-danger'
                            type='button'
                            id='button-addon2'
                            data-ripple-color='dark'
                            onClick={handleClearingResults}
                        >
                            Rafraichir
                        </button>
                    </div>
                </div>
                <div className='boite-de-resulstat'>
                    {}
                    {loading && (
                        <div className='spinner-border' role='status'>
                            <span className='sr-only'>Recherche en cours...</span>
                        </div>
                    )}
                    {}
                    <ul className='list'>{breweries && breweriesArr}</ul>
                    {}
                    {emptyResult === true && (
                        <p className='lead text-center'>Pas de résultat !</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
