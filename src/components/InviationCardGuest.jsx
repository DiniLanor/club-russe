import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import ballok from '../assets/ballok.png';
import gamer from '../assets/gamer.jpg';
import apiService from '../apiService';

const InviationCardGuest = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [user, setUser] = useState({});
    const [tik, setTik] = useState({});
    const [invitedName, setInvitedName] = useState('');

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    useEffect(() => {

        const usr = async () => {
            const response = await apiService.getUser(window.location.pathname.split('/')[2]);
            setUser(response.usr);
            setTik(response.tik);
        };

        usr();

        return () => {

        };
    }, []);


    const handleConfirm = async () => {
        if (invitedName.length < 5) {
            alert('Votre nom doit avoir au moins 5 caractères.')
            return;
        }
        const response = await apiService.guestConfirm(user._id, invitedName);
        alert(response.message);

        window.location.reload();
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 md:p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl mx-auto">
                {/* Titre de l'événement */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-700 to-black bg-clip-text text-transparent mb-2">
                        Invitation Officielle
                    </h1>
                </div>

                {/* Carte d'invitation principale */}
                <div className="relative mb-8">
                    {/* Effet de carte avec ombre et bordure */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-30"></div>

                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                        {/* En-tête avec équipes */}
                        <div className="p-5 text-black text-center">
                            <div className="flex justify-between flex-col relative items-center mb-4">
                                <div className="text-center flex items-center z-10">
                                    <img src={ballok} alt="ballok" className='h-5 w-5 transform rotate-180' />
                                    <div className="text-xl font-bold">ASSOCIATION SPORTIVE</div>
                                    <img src={ballok} alt="ballok" className='h-5 w-5' />
                                </div>
                                <div className="text-center flex-1 z-10">
                                    <div className="text-xl font-bold">2-0</div>
                                </div>
                                <div className="text-center flex-1 z-10">
                                    <div className="text-xl font-bold">CLUB RUSSE</div>
                                </div>
                                <div className="mx-4 z-10">
                                    <div className="w-40 h-40 rounded-full bg-white/5 flex items-center justify-center">
                                        <img src={logo} alt="logo" />
                                    </div>
                                </div>
                                <img src={gamer} className='absolute h-56' />
                            </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="px-6 italic">
                            {/* Titre de l'événement */}
                            <div className="mb-6 text-center">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Vous convie à sa soirée de Gala de Clôture Annuelle</h2>
                                <p className="text-gray-600 text-sm italic">sous le thème:</p>
                                <p className="text-gray-600 text-sm italic">"Élégance & Réussite - Le Spectacle Continue - Nuit Étoilée"</p>
                            </div>

                            {/* Message d'invitation */}
                            <div className="mb-6">
                                <p className='text-center'>Mr/Mme <span className='font-extrabold'>{user?.fullName}</span></p>
                                <p className="text-gray-700 leading-relaxed text-center mb-4">
                                    a l'honneur de vous inviter à une soirée exceptionnelle marquant la fin de cette année riche en projets et en réussites. Ce sera l'occasion de célébrer ensemble nos accomplissements et de partager un moment privilégié dans une atmosphère festive et raffinée.
                                </p>
                            </div>

                            {/* Détails de l'événement */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center flex-col">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                        <span className="text-purple-700">📅</span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className="font-semibold text-gray-800">Quand ?</h3>
                                        <p className="text-gray-700">Le <span className='font-bold'>03 Janvier 2026</span> à partir de <span className='font-bold'>20h</span></p>
                                    </div>
                                </div>

                                <div className="flex items-center flex-col">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <span className="text-blue-700">📍</span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className="font-semibold text-gray-800">Où ?</h3>
                                        <p className="text-gray-700 text-md">TEM PALCE HOTEL derrière Moto Georges, Lycée de Nkol Eton</p>
                                    </div>
                                </div>

                                {/* <div className="flex items-center flex-col">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                        <span className="text-indigo-700">🎭</span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className="font-semibold text-gray-800">Thème</h3>
                                        <p className="text-gray-700">Élégance & Réussite / Le Spectacle Continue / Nuit Étoilée</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Programme */}
                            <div className="bg-gradient-to-r relative from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-100">
                                <h3 className="font-bold text-gray-800 mb-2 flex items-center z-10">
                                    <span className="mr-2">🎵</span> Au programme
                                </h3>
                                <ul className='ml-10 z-10'>
                                    <li className='flex items-center gap-2'> <img src={ballok} alt="ballok" className='h-4' /> Dîner de gala</li>
                                    <li className='flex items-center gap-2'> <img src={ballok} alt="ballok" className='h-4' /> Animation musicale</li>
                                    <li className='flex items-center gap-2'> <img src={ballok} alt="ballok" className='h-4' /> Surprises</li>
                                </ul>
                            </div>

                            {/* Bouton pour voir les détails de confirmation */}
                            <div className="text-center">
                                <button
                                    onClick={toggleFlip}
                                    className="px-6 mb-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {isFlipped ? "Voir l'invitation" : "Confirmer présence"}
                                </button>
                            </div>
                        </div>

                        {/* Bas de la carte */}

                    </div>
                </div>

                {/* Section de confirmation (affichée au flip) */}
                {isFlipped && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 animate-fade-in">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmation de présence</h3>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4 text-center">
                                Nous serions très honorés de votre présence à notre Soirée de Gala.
                            </p>

                            {
                                !tik.used
                                    ? <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                                        <p className="text-center font-medium text-gray-800">
                                            Merci de bien vouloir confirmer votre participation avant le
                                            <span className="font-bold text-purple-700"> 02/01/2026</span>
                                        </p>
                                        <p className="text-center text-gray-600 mt-2 mb-6">
                                            En remplissant votre nom ci-dessous:
                                        </p>


                                        <div>
                                            <input className='w-full bg-white rounded h-10 px-5 uppercase font-bold' type="text" name="invitedName" onChange={e => setInvitedName(e.target.value)} />
                                        </div>

                                    </div>

                                    : <div className="w-full text-center px-5 py-3 text-green-700 bg-green-50 font-medium rounded-xl flex-1 sm:flex-none">
                                        Présence confirmée
                                    </div>
                            }





                        </div>

                        {/* Boutons d'action */}

                        {
                            !tik.used
                                ? <div className="flex flex-col sm:flex-row gap-4 justify-center">

                                    <button onClick={handleConfirm} className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl flex-1 sm:flex-none">
                                        Je confirme ma présence
                                    </button>


                                    <button
                                        onClick={toggleFlip}
                                        className="px-5 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl flex-1 sm:flex-none"
                                    >
                                        Retour
                                    </button>
                                </div>
                                : null
                        }
                        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-600 text-sm">Cordialement,</p>
                            <p className="font-bold text-gray-800">L'Association Sportive</p>
                            <p className="font-bold text-gray-800"><span className='text-red-600'>CLUB</span> RUSSE</p>
                        </div>
                    </div>
                )}

                {/* Notes pour mobile */}
                {/* <div className="text-center text-gray-500 text-sm mt-8">
                    <p>Faites défiler pour voir tous les détails de l'événement</p>
                    <div className="mt-2 animate-bounce">👇</div>
                </div> */}
            </div>

            {/* Styles d'animation personnalisés */}

        </div>
    );
};

export default InviationCardGuest;