import React, { useState, useEffect } from 'react';
import {
    Users,
    Ticket,
    CheckCircle,
    UserPlus,
    BarChart3,
    Menu,
    X,
} from 'lucide-react';
import api from './apiService';
import { copierTexte } from './helpers';

const Home = () => {
    const code = 'Admin@1234';
    // États pour les données
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);

    // États pour les filtres et recherche
    const [enteredCode, setEnteredCode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('overview');

    // États pour la sidebar mobile
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    // États pour les formulaires
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ fullName: '' });



    // Données de démo (simulation API)
    useEffect(() => {

        const t = async () => {
            const response = await api.getData();

            setUsers(response.users);
            setTickets(response.tickets);
            setFilteredUsers(response.users);
            setFilteredTickets(response.tickets);
        };

        t();
    }, [prompt]);

    // Calcul des statistiques
    const totalInvites = users.length + tickets.filter(ticket => ticket.used).length;
    const totalInvitesConfirmes = users.filter(user => user.confirmInvitation).length + tickets.filter(ticket => ticket.used).length;
    const totalUsers = users.length;
    const confirmedUsers = users.filter(user => user.confirmInvitation).length;
    const totalTickets = tickets.filter(ticket => ticket.used).length;
    const usedTickets = tickets.filter(ticket => ticket.used).length;
    const pendingTickets = totalTickets - usedTickets;

    const verif = () => {
        if(localStorage.getItem('key-invite') === code){
            setIsAuth(true);
        }
    };

    // Gestion de la recherche et des filtres
    useEffect(() => {
        let filteredU = users;
        let filteredT = tickets;

        verif();

        // Filtre par recherche
        if (searchTerm) {
            filteredU = filteredU.filter(user =>
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.code.toLowerCase().includes(searchTerm.toLowerCase())
            );

            filteredT = filteredT.filter(ticket =>
                (ticket.invitedName && ticket.invitedName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                users.find(user => user._id === ticket.userId)?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtre par statut pour les utilisateurs
        if (statusFilter === 'confirmed') {
            filteredU = filteredU.filter(user => user.confirmInvitation);
        } else if (statusFilter === 'pending') {
            filteredU = filteredU.filter(user => !user.confirmInvitation);
        }

        // Filtre par statut pour les tickets
        if (statusFilter === 'used') {
            filteredT = filteredT.filter(ticket => ticket.used);
        } else if (statusFilter === 'unused') {
            filteredT = filteredT.filter(ticket => !ticket.used);
        }

        setFilteredUsers(filteredU);
        setFilteredTickets(filteredT);
    }, [searchTerm, statusFilter, users, tickets]);

    // Gestion des formulaires
    const handleAddUser = async (e) => {
        e.preventDefault();
        if (newUser.fullName) {
            const user = {
                newUser
            };
            const response = await api.createGuest(newUser.fullName);
            setUsers(response.users);
            setTickets(response.tickets)

            setShowAddUserModal(false);
        }
    };


    const toggleUserConfirmation = (userId) => {
        setUsers(users.map(user =>
            user._id === userId
                ? { ...user, confirmInvitation: !user.confirmInvitation }
                : user
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(enteredCode === code){
            localStorage.setItem('key-invite', enteredCode);
            setIsAuth(true);
        }
    };

    return isAuth
        ? <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar pour mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-gray-800">Gestion Invitations</h2>
                            <button onClick={() => setSidebarOpen(false)} className="p-1">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="space-y-2">
                            <SidebarLinks activeTab={activeTab} tickets={tickets} users={users} setActiveTab={setActiveTab} />
                        </nav>
                    </div>
                </div>
            )}

            <div className="flex">
                {/* Sidebar (desktop) */}
                <aside className="hidden lg:block w-64 bg-white shadow-lg min-h-screen p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Gestion Invitations</h2>
                        <p className="text-gray-600 text-sm">Soirée de Gala 2026</p>
                    </div>
                    <nav className="space-y-2">
                        <SidebarLinks activeTab={activeTab} tickets={tickets} users={users} setActiveTab={setActiveTab} />
                    </nav>
                </aside>

                {/* Contenu principal */}
                <main className="flex-1 p-4 md:p-6">
                    {/* Header */}
                    <header className="mb-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 mr-3 rounded-lg hover:bg-gray-100"
                                >
                                    <Menu size={24} />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {activeTab === 'overview' ? 'Tableau de Bord' :
                                            activeTab === 'users' ? 'Gestion des Invités' :
                                                activeTab === 'tickets' ? 'Gestion des Tickets' :
                                                    'Statistiques'}
                                    </h1>
                                    <p className="text-gray-600">Soirée de Gala - 03/01/2026</p>
                                </div>
                            </div>

                            {/* <div className="flex items-center space-x-3">
                            <button
                                onClick={exportData}
                                className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                            >
                                <Download size={18} className="mr-2" />
                                Exporter
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <RefreshCw size={20} />
                            </button>
                        </div> */}
                        </div>
                    </header>

                    {/* Barre de recherche et filtres */}
                    {
                        activeTab === 'tickets' || activeTab === 'users'
                            ?
                            <div className="bg-white rounded-xl shadow p-4 mb-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">


                                    <div className="flex flex-wrap gap-3">


                                        {activeTab === 'users' && (
                                            <button
                                                onClick={() => setShowAddUserModal(true)}
                                                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg"
                                            >
                                                <UserPlus size={18} className="mr-2" />
                                                Ajouter un membre
                                            </button>
                                        )}


                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    {/* Contenu selon l'onglet actif */}
                    {activeTab === 'overview' ? (
                        <OverviewTab
                            totalInvitesConfirmes={totalInvitesConfirmes}
                            totalInvites={totalInvites}
                            totalUsers={totalUsers}
                            confirmedUsers={confirmedUsers}
                            totalTickets={totalTickets}
                            usedTickets={usedTickets}
                            pendingTickets={pendingTickets}
                            users={users}
                            tickets={tickets}
                        />
                    ) : (
                        <UsersTab
                            filteredUsers={filteredUsers}
                            toggleUserConfirmation={toggleUserConfirmation}
                            users={users}
                        />
                    )}
                </main>
            </div>

            {/* Modals */}
            {showAddUserModal && (
                <AddUserModal
                    newUser={newUser}
                    setNewUser={setNewUser}
                    handleAddUser={handleAddUser}
                    setShowAddUserModal={setShowAddUserModal}
                />
            )}

        </div>
        : <div className='h-screen flex'>
            <form onSubmit={handleSubmit} className='flex flex-col my-auto mx-auto bg-gray-50/50 shadow-md shadow-gray-500 p-20 rounded gap-4'>
                <span className='text-center uppercase font-bold'>Identification</span>
                <input onChange={e => setEnteredCode(e.target.value)} type="text" placeholder="Merci de rentrer le code" className='px-2 py-2 border border-gray-200 rounded' />
                <input type="submit" value="Se connecter" className='bg-green-100 text-green-900 font-bold p-2 rounded hover:bg-green-200 hover:text-green-700 hover:cursor-pointer' />
            </form>
        </div>


    // return <>Access interdit</>

};

// Composant SidebarLinks
const SidebarLinks = ({ activeTab, totalInvitesConfirmes, setActiveTab, users, tickets }) => (
    <>
        <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'hover:bg-gray-100 text-gray-700'
                }`}
        >
            <BarChart3 size={20} className="mr-3" />
            Tableau de bord
        </button>

        <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'users'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'hover:bg-gray-100 text-gray-700'
                }`}
        >
            <Users size={20} className="mr-3" />
            Gestion des membres
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {users.length}
            </span>
        </button>

    </>
);

// Composant OverviewTab
const OverviewTab = ({
    totalInvites,
    totalInvitesConfirmes,
    totalUsers,
    confirmedUsers,
    totalTickets,
    usedTickets,
    pendingTickets,
    users,
    tickets
}) => (
    <div className="space-y-6">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Total invités"
                value={totalInvites}
                icon={<Users size={24} className="text-blue-600" />}
                color="blue"
                subtitle={`${totalInvitesConfirmes} confirmés`}
            />
            <StatCard
                title="Total membres"
                value={totalUsers}
                icon={<Users size={24} className="text-blue-600" />}
                color="blue"
                subtitle={`${confirmedUsers} confirmés`}
            />
            <StatCard
                title="Total invités"
                value={totalTickets}
                icon={<Ticket size={24} className="text-purple-600" />}
                color="purple"
                subtitle={`${usedTickets} confirmés`}
            />
            <StatCard
                title="Confirmation taux"
                value={totalInvitesConfirmes > 0 ? `${Math.round((totalInvitesConfirmes / totalInvites) * 100)}%` : '0%'}
                icon={<CheckCircle size={24} className="text-green-600" />}
                color="green"
                subtitle={`${totalInvitesConfirmes}/${totalInvites}`}
            />
        </div>

        {/* Tableaux récapitulatifs */}
        <div className="grid grid-cols-1 gap-6">
            {/* Derniers invités */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Derniers invités</h3>
                    <h3 className="text-lg font-semibold text-gray-800">Personnes Invitées</h3>
                    <button className="text-blue-600 text-sm font-medium">Voir tout</button>
                </div>
                <div className="space-y-3">
                    {users.slice(0, 5).map(user => (
                        <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-3 ${user.confirmInvitation ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <div className='flex gap-4'>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.fullName}</p>
                                        <p className="text-sm text-gray-500">{user.code}</p>
                                    </div>
                                    <div>
                                        <button className="font-medium text-gray-800 bg-slate-200 rounded px-4 py-1" onClick={() => copierTexte(`${window.location.protocol}//${window.location.host}/invitation/${user._id}`)}>Copier le lien</button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-2 py-1 uppercase rounded-md  bg-green-50 text-gray-950`}>
                                    {tickets.find(ticket => ticket.userId._id === user._id).invitedName}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className={`px-2 py-1 rounded-full text-xs ${user.confirmInvitation ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {user.confirmInvitation ? 'Confirmé' : 'En attente'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Composant UsersTab
const UsersTab = ({ filteredUsers, toggleUserConfirmation, users }) => (
    <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Liste des Membres ({filteredUsers.length})</h3>
            <p className="text-gray-600 text-sm">Gérer les membres invités et leurs confirmations</p>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invité</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {user.fullName.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-medium text-gray-900">{user.fullName}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {user.code}
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.confirmInvitation
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {user.confirmInvitation ? 'Confirmé' : 'En attente'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {filteredUsers.length === 0 && (
            <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Aucun invité trouvé</p>
            </div>
        )}
    </div>
);



// Composants utilitaires
const StatCard = ({ title, value, icon, color, subtitle }) => {
    const colorClasses = {
        blue: 'border-blue-200',
        purple: 'border-purple-200',
        green: 'border-green-200',
        orange: 'border-orange-200'
    };

    return (
        <div className={`bg-white rounded-xl shadow p-6 border-t-4 ${colorClasses[color]}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${color}-50`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};


const AddUserModal = ({ newUser, setNewUser, handleAddUser, setShowAddUserModal }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Ajouter un invité</h3>
                    <button onClick={() => setShowAddUserModal(false)} className="p-1 hover:bg-gray-100 rounded">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleAddUser}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={newUser.fullName}
                                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                                placeholder="Jean Dupont"
                            />
                        </div>


                    </div>

                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={() => setShowAddUserModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg"
                        >
                            Ajouter l'invité
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);



export default Home;