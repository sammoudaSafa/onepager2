
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Liste } from './liste';
import { LoginForm } from './loginform';

interface Props { }
interface State { }

export class Accueil extends React.Component<Props, State> {
     public static contextType = UserContext;
     public context: UserContext;

     constructor(props: Props) {
          super(props);
          this.state = {};
     }

     public render() {
          return <>
               <section className='accueil'>
                    <h1>Gestionnaire de publicité Effix</h1>
                    {this.context.user ? <Liste /> : <LoginForm />}
               </section >
          </>;
     }
}
