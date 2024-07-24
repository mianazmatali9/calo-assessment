
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const AppLayout = (): JSX.Element => {

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};
