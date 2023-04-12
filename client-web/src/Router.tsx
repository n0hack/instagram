import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './screens/Home';
import About from './screens/About';
import NotFound from './screens/NotFound';
import ErrorComponent from './components/ErrorComponent';

// 오브젝트로 라우팅을 정의하여, 가독성을 높이고, 중복을 줄인다.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
