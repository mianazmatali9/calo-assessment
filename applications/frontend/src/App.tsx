import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import Router from './routers';

export const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <div className="container mx-auto">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
