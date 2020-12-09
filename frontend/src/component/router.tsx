import { UserContext } from 'context/usercontext';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Accueil } from './accueil';
import { Editor } from './editor';
import { LogoutButton } from './logoutbutton';
import { ManageUsers } from './usermanager';

export class Router extends React.Component<{}> {
     public static contextType = UserContext;
     public context: UserContext;
     public render() {
          return <BrowserRouter>
               {this.context.user && <LogoutButton />}
               <Route path='/publicites/:publiciteId' exact={true} component={Editor} />
               <Route path='/admin' exact={true}> <ManageUsers /> </Route>
               <Route path='/' exact={true}> <Accueil /></Route>
          </ BrowserRouter>;
     }
}
