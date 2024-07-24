import { Navigate, useRoutes } from 'react-router-dom';
import { Jobs } from '../components/jobs/Jobs';
import { AppLayout } from '../components/shared/Layout';

const appRoutes = [
  {
    path: '/',
    element: <Jobs />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
];

export const router = {
  element: <AppLayout />,
  children: appRoutes,
};

const Router: React.FC = () => {
  return useRoutes([
    {
      element: <Navigate to="/" replace />,
      children: [
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
    router,
  ]);
};

export default Router;
