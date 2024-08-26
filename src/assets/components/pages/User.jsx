import React, { useState, useEffect } from 'react';
import AccountSection from '../AccountSection';
import Header from '../Header';  

const UserPage = () => {
  // Récupérer le nom depuis le localStorage 
  const [nom, setNom] = useState(() => {
    return localStorage.getItem('nomUtilisateur') || 'Tony Jarvis';
  });
  const [enEdition, setEnEdition] = useState(false);
  const [nouveauNom, setNouveauNom] = useState(nom);

  // Mettre à jour le localStorage lorsque le nom change
  useEffect(() => {
    localStorage.setItem('nomUtilisateur', nom);
  }, [nom]);

  // Gestion bouton "Modifier"
  const gererClicEdition = () => {
    setEnEdition(true);
  };

  // Gestion de la soumission du formulaire
  const gererSoumissionFormulaire = (e) => {
    e.preventDefault();
    setNom(nouveauNom);
    setEnEdition(false);
  };

  // Gestion des changements dans le champ de saisie
  const gererChangementSaisie = (e) => {
    setNouveauNom(e.target.value);
  };

  // Gestion de l'annulation de l'édition
  const gererAnnulation = () => {
    setEnEdition(false);
    setNouveauNom(nom); 
  };

  // Extraire le prénom du nom complet
  const prenom = nom.split(' ')[0];

  return (
    <>
      <Header firstName={prenom} /> 
      <main className="main bg-dark">
        <div className="header">
          {enEdition ? (
            <form onSubmit={gererSoumissionFormulaire}>
              <div className="form-group">
                <label htmlFor="nom">New Name</label>
                <input
                  type="text"
                  id="nom"
                  value={nouveauNom}
                  onChange={gererChangementSaisie}
                />
              </div>
              <button type="submit" className="save-button">Enregistrer</button>
              <button type="button" className="cancel-button" onClick={gererAnnulation}>Annuler</button>
            </form>
          ) : (
            <>
              <h1>Welcome back<br />{nom} !</h1>
              <button className="edit-button" onClick={gererClicEdition}>Edit Name</button>
            </>
          )}
        </div>
        <h2 className="sr-only">Comptes</h2>
        <AccountSection
          title="Argent Bank Compte Courant (x8349)"
          amount="$2,082.79"
          description="Solde disponible"
        />
        <AccountSection
          title="Argent Bank Épargne (x6712)"
          amount="$10,928.42"
          description="Solde disponible"
        />
        <AccountSection
          title="Argent Bank Carte de Crédit (x8349)"
          amount="$184.30"
          description="Solde actuel"
        />
      </main>
    </>
  );
};

export default UserPage;
