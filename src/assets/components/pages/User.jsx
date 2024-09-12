
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserProfile } from '../../../redux/reducers/AuthSlices';
import AccountSection from '../AccountSection';
import Header from '../Header';

const UserPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Charger le nom depuis localStorage ou utiliser une valeur par défaut
  const [nom, setNom] = useState(() => {
    const storedName = localStorage.getItem('nomUtilisateur');
    return userInfo?.userName || storedName || 'Tony Jarvis'; 
  });

  const [enEdition, setEnEdition] = useState(false);
  const [nouveauNom, setNouveauNom] = useState(nom);

  // Récupérer le profil utilisateur lors du montage
  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  // Mettre à jour le nom dans localStorage lorsque nom change
  useEffect(() => {
    if (nom) {
      localStorage.setItem('nomUtilisateur', nom);
    }
  }, [nom]);

  // Gestion de la soumission pour mettre à jour le nom
  const gererSoumissionFormulaire = (e) => {
    e.preventDefault();
    setNom(nouveauNom);
    setEnEdition(false);

    // Mise à jour via l'API
    dispatch(updateUserProfile({ userName: nouveauNom })) 
      .unwrap()
      .then(() => {
      })
      .catch((error) => {
        console.error('Failed to update profile:', error);
      });
  };

  // Gestion du champ de saisie du nom
  const gererChangementSaisie = (e) => {
    setNouveauNom(e.target.value);
  };

  // Annuler la modification
  const gererAnnulation = () => {
    setEnEdition(false);
    setNouveauNom(nom);
  };

  // Extraire le prénom à partir du nom
  const prenom = nom?.split(' ')[0] || 'Tony';

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
              <button className="edit-button" onClick={() => setEnEdition(true)}>Edit Name</button>
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
