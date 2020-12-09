import { Api } from 'api';
import axios from 'axios';
import { PubliciteModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props { }
interface State {
    publicites: PubliciteModel[];
    clients: [],
    isLoaded: boolean,
}

export class Liste extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;

    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = {
            publicites: [],
            clients: [],
            isLoaded: false,
        };
    }

    public async componentDidMount() {
        const publicites = (await this.api.getJson('/publicites') as any[]).map(PubliciteModel.fromJSON);
        this.setState({ publicites });

        axios.get('https://effix-commerce.bianka.devwebgarneau.com/wp-json/wp/v2/users/')
            .then(res => this.setState({
                clients: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    public render() {
        const { user } = this.context;
        const { publicites } = this.state;
        const countClients = publicites.length;
        if (!publicites) { return 'Chargement...'; }

        return <>
            <section className='admin-main'>
                <h2>Bonjour [{user?.username}]</h2>
                <button onClick={this.createClients}>Synchroniser les clients</button>
                <h3>Liste des clients ({countClients})</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Id du client</th>
                            <th>Status de la plublicité</th>
                            <th>Éditeur de publicité</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publicites!.map(publicite => {
                            return <>
                                <tr key={publicite.publiciteId}>
                                    <td>{publicite.nom_client} </td>
                                    <td><span className={publicite.status ? 'online' : 'offline'}>{publicite.status === 1 ? 'En ligne' : ' Hors ligne'} </span></td>
                                    <td><Link to={`/publicites/${publicite.publiciteId}`}>Lien</Link></td>
                                </tr>
                            </>;
                        })}
                    </tbody>
                </table>
            </section>
        </>;
    };

    private createClients = async (publicite: PubliciteModel) => {
        const { clients, publicites } = this.state;
        let clientdata: any = '';

        for (const element of clients) {
            const name = element.name;
            const clientId = element.id;

            const searchName = publicites.filter(client => client.clientId === element.id);

            // ajout seulement des abonnées à la liste des publicités.
            if (searchName.length >= 1) {
            } else if (element.roles[0] === 'subscriber') {
                clientdata = { nom_client: name, clientId, roles: 'subscriber', message: 'speech de vente du client', lien: 'https://facebook.com' };
                PubliciteModel.fromJSON(await this.api.postGetJson('/publicites', clientdata));
                const liste = (await this.api.getJson('/publicites')).map(PubliciteModel.fromJSON);
                this.setState({ publicites: liste });
            }

            for (const pub of publicites) {
                // vérifie si le client est toujours abonné
                if (element.id === publicite.clientId && element.roles[0] !== publicite.roles) {
                    const clientState = { roles: 'client', status: 0 };
                    await this.api.putGetJson('/publicites', pub.publiciteId, clientState);
                    const liste = (await this.api.getJson('/publicites')).map(PubliciteModel.fromJSON);
                    this.setState({ publicites: liste });
                }
            }
        };
    };
}
