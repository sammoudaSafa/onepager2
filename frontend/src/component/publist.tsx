import axios from 'axios';
import React from 'react';


interface Props { }
interface State {
    pubs?: [];

}

export class PubList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            pubs: [],
        };
    }

    public async componentDidMount() {
        // this.api.getAxios('/publicites').then(res => { this.setState({ pubs: res.data }); });

        axios.get('http://localhost:1280/publicites')
            .then(res => this.setState({

                pubs: res.data,
            }))
            .catch(err => console.log(err));
    }

    public render() {
        const { pubs }: any = this.state;
        if (!pubs) { return 'Chargement des publicités...'; }

        return <>
            <main>
                <section>
                    {pubs!.map(publicite => {
                        return <>
                            <tr key={publicite.publiciteId}>

                                <img src={publicite.image} />

                                <td>{publicite.nom_client} </td>
                                <td><span className={publicite.status ? 'online' : 'offline'}>{publicite.status === 1 ? 'En ligne' : ' Hors ligne'} </span></td>

                            </tr>
                        </>;
                    })};
                </section>
            </main>
        </>;
    }
}
