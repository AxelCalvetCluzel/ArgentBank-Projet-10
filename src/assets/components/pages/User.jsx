
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserProfile, logoutUser } from '../../../redux/reducers/AuthSlices';
import AccountSection from '../AccountSection';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [nom, setNom] = useState(() => {
    const storedName = localStorage.getItem('nomUtilisateur');
    return userInfo?.userName || storedName || 'Tony Jarvis'; 
  });

  const [enEdition, setEnEdition] = useState(false);
  const [nouveauNom, setNouveauNom] = useState(nom);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (nom) {
      localStorage.setItem('nomUtilisateur', nom);
    }
  }, [nom]);

  const gererSoumissionFormulaire = (e) => {
    e.preventDefault();
    setNom(nouveauNom);
    setEnEdition(false);

    dispatch(updateUserProfile({ userName: nouveauNom })) 
      .unwrap()
      .then(() => {
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Failed to update profile:', error);
      });
  };

  const gererChangementSaisie = (e) => {
    setNouveauNom(e.target.value);
  };

  const gererAnnulation = () => {
    setEnEdition(false);
    setNouveauNom(nom);
  };

  const prenom = nom?.split(' ')[0] || 'Tony';

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); 
  };

  return (
    <>
      <Header firstName={prenom} handleLogout={handleLogout} />
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
