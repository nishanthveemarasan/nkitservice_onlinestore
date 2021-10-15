import React from 'react';



//components
const IpgProvider = React.lazy(() => import('./Components/views/ipgProvider/IpgProvider'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/ipg-provider', name: 'IpgProvider', component: IpgProvider },
 
];

export default routes;
