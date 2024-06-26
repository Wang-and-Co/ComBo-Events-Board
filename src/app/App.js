import logo from './../logo.svg';
import './../App.css';
import { Button } from '@mui/material';
import { showConfirmationModal } from '../shared-components/modals';
import Layout from './Layout';
import Providers from './Providers';
import toast from 'react-hot-toast';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Providers>
      <Layout>
        <AppRoutes />
      </Layout>
    </Providers>
  );
};

export default App;
