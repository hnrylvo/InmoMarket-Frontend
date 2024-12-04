import React, { useState } from 'react';
import { Users, FileText, X, LogOut, Trash2, Eye, Check, Home } from 'lucide-react';
import * as AdminService from '../../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/modals/Modal';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState(null);
  const navigate = useNavigate();
  const { removeToken } = useAuth();

  const handleLogout = async () => {
    try {
      await removeToken(); // This will handle the logout API call
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleHomeRedirect = () => {
    navigate('/home'); // Redirect to home page
  }

  const renderContent = () => {
    switch(activeView) {
      case 'users':
        return <UserManagement />;
      case 'publications':
        return <PublicationManagement />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-24 bg-white shadow-md flex flex-col items-center py-8 space-y-6">
        <button 
          onClick={handleHomeRedirect}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
          title="Ir al Inicio"
        >
          <Home className="w-6 h-6 text-blue-500" />
        </button>

        <button 
          onClick={() => setActiveView('users')} 
          className={`p-3 rounded-lg ${activeView === 'users' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} transition-colors`}
        >
          <Users className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setActiveView('publications')} 
          className={`p-3 rounded-lg ${activeView === 'publications' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} transition-colors`}
        >
          <FileText className="w-6 h-6" />
        </button>
        <button 
          onClick={handleLogout}
          className="p-3 rounded-lg hover:bg-gray-100 transition-colors mt-auto"
          title="Cerrar Sesión"
        >
          <LogOut className="w-6 h-6 text-red-500" />
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const WelcomeScreen = () => (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel de Administración</h1>
      <p className="text-gray-600">Selecciona una opción para comenzar</p>
    </div>
  );


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await AdminService.getAllUsers();
      setUsers(userData);
    } catch (error) {
      setError('Error al cargar usuarios');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await AdminService.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('Error al eliminar usuario');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h2>
        <button 
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Cargar Usuarios
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div 
              key={user._id} 
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button 
                onClick={() => deleteUser(user._id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Publication Management Component
const PublicationManagement = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReportedPublications = async () => {
    setLoading(true);
    setError(null);
    try {
      const publicationData = await AdminService.getReportedPublications();
      setPublications(publicationData);
    } catch (error) {
      setError('Error al cargar publicaciones');
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePublicationStatus = async (publicationId, status) => {
    try {
      await AdminService.changePublicationStatus(publicationId, status);
      setPublications(publications.filter(pub => pub._id !== publicationId));
      setIsModalOpen(false);
    } catch (error) {
      setError('Error al actualizar estado de publicación');
      console.error('Error updating publication status:', error);
    }
  };

  const deletePublication = async (publicationId) => {
    try {
      await AdminService.deletePublication(publicationId);
      setPublications(publications.filter(pub => pub._id !== publicationId));
      setIsModalOpen(false);
    } catch (error) {
      setError('Error al eliminar la publicación');
      console.error('Error deleting publication:', error);
    }
  };

  const openPublicationDetails = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Publicaciones</h2>
        <button 
          onClick={fetchReportedPublications}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Cargar Publicaciones
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publications.map(publication => (
            <div 
              key={publication._id} 
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800 mb-2">{publication.department}, {publication.neighborhood}</h3>
                <p className="text-sm text-gray-500 mb-2">Vendedor: {publication.seller?.name}</p>
              </div>
              
              <button 
                onClick={() => openPublicationDetails(publication)}
                className="mt-4 w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
              >
                <Eye className="mr-2 w-5 h-5" /> Ver Detalles
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedPublication && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedPublication.department}, {selectedPublication.neighborhood}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 font-medium">Precio</p>
                <p className="text-lg">${selectedPublication.propertyPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Vendedor</p>
                <p>{selectedPublication.seller?.name}</p>
                <p className="text-sm text-gray-500">{selectedPublication.seller?.email}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 font-medium mb-2">Descripción</p>
              <p>{selectedPublication.propertyDescription}</p>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => updatePublicationStatus(selectedPublication._id, 'approved')}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
              >
                <Check className="mr-2 w-5 h-5" /> Aprobar
              </button>
              <button 
                onClick={() => updatePublicationStatus(selectedPublication._id, 'rejected')}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
              >
                <X className="mr-2 w-5 h-5" /> Rechazar
              </button>
              <button 
                onClick={() => deletePublication(selectedPublication._id)}
                className="flex-1 bg-gray-200 text-red-600 px-3 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center"
              >
                <Trash2 className="mr-2 w-5 h-5" /> Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;