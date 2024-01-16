import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/UserService';
import { getAccessToken } from '../services/AuthService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const accessToken = getAccessToken();
        if (accessToken) {
          await logoutUser(accessToken);
        }

        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
    handleLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
