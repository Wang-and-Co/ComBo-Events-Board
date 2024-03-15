import { showConfirmationModal } from '../../shared-components/modals';
import toast from 'react-hot-toast';
import logo from './../../logo.svg';
import { Button } from '@mui/material';

const SamplePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button
          variant="contained"
          onClick={() =>
            showConfirmationModal({
              title: 'among us alert!',
              description: 'Raw men and maximum samuel',
            })
          }
        >
          Show Modal
        </Button>
        <Button
          variant="contained"
          onClick={() => toast('Executed the entire population of gamers')}
        >
          test2
        </Button>
      </header>
    </div>
  );
};
export default SamplePage;