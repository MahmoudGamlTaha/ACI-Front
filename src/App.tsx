import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routers';
import ToasterUi from './components/ToasterUi';


const App: React.FC = () => {

  return (
    <>
      <RouterProvider router={router} />
      <ToasterUi />
    </>
  );
};

export default App;
