// Modal qui montre les détails de chaque brasserie
import React from "react";
import { EmojioneV4 } from "react-emoji-render";

// Fonction qui formate la chaîne du numéro de téléphone à partir de
// 1234567890 => (123) 456-7890 format americain ducoup car l'api ya que des brasserie us
const formatNumber = (phoneStr) => {
    let cleaned = ("", phoneStr).replace(/\D/g, "");

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
};

/**
 *
 * @param {object} brewery - La brasserie sélectionnée par l'utilisateur pour afficher plus de détails.
 */
const Details = ({ brewery }) => {
    const breweryAddress =
        brewery.street +
        ", " +
        brewery.city +
        ", " +
        brewery.state +
        " " +
        brewery.postal_code;

    

    return (
        <div>
            <div
                className='modal fade'
                id={"detailsModal_" + brewery.id}
                tabIndex='-1'
                role='dialog'
                aria-labelledby='detailsModal'
                aria-hidden='true'
                key={brewery.id}
            >
                <div
                    className='modal-dialog modal-dialog-centered'
                    role='document'
                >
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5
                                className='modal-title'
                                id='exampleModalLongTitle'
                            >
                                {brewery.name}
                            </h5>
                           
                            <button
                                type='button'
                                className='Retour'
                                data-dismiss='modal'
                                aria-label='Retour'
                            >
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <p>
                                <EmojioneV4
                                    className='mr-2'
                                    text=':beer:'
                                    style={{ fontSize: "1.5em" }}
                                />
                                {brewery.brewery_type[0].toUpperCase() +
                                    brewery.brewery_type.slice(1)}
                            </p>
                            <p>
                                <EmojioneV4
                                    className='mr-2'
                                    text=':house:'
                                    style={{ fontSize: "1.5em" }}
                                />
                                <a
                                    href={
                                        "http://maps.google.com/?q=" +
                                        breweryAddress
                                    }
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    aria-label='Adresse de la brasserie'
                                >
                                    {breweryAddress}
                                </a>
                            </p>
                            <p>
                                <EmojioneV4
                                    className='mr-2'
                                    text=':phone:'
                                    style={{ fontSize: "1.5em" }}
                                />
                                {brewery.phone ? (
                                    <a
                                        aria-label='Numero de tel de la brasserie'
                                        href={
                                            "tel:" + formatNumber(brewery.phone)
                                        }
                                    >
                                        {formatNumber(brewery.phone)}
                                    </a>
                                ) : (
                                    <span>Aucun</span>
                                )}
                            </p>
                            <p>
                                <EmojioneV4
                                    className='mr-2'
                                    text=':link:'
                                    style={{ fontSize: "1.5em" }}
                                />
                                {brewery.website_url ? (
                                    <a
                                        aria-label='Site de la brasserie'
                                        href={brewery.website_url}
                                        target='_blank'
                                        rel='noreferrer noopener'
                                    >
                                        {brewery.website_url}
                                    </a>
                                ) : (
                                    <span>Aucun</span>
                                )}
                            </p>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-danger'
                                data-dismiss='modal'
                            >
                                Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
