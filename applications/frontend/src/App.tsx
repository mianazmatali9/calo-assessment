import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Router from './routers';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <div className="container mx-auto">
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
