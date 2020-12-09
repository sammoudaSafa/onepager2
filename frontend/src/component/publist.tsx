import { Api } from 'api';
import { PubliciteModel } from 'common';
import React from 'react';
import { PubCard} from './pubcard';


interface Props { }
interface State {
    pubs?: PubliciteModel[];

}

export class PubList extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
         this.api.getAxios('/publicites').then(res =>{ this.setState({ pubs: res.data })});
    }

    public render() {
        const { pubs } = this.state;
        if (!pubs) { return 'Chargement des nouvelles...'; }

        return <>
            <main>
                <section>
                    {pubs.map(pub =>
                        <PubCard key={pub.publiciteId} pub={pub} />)}
                </section>
            </main>
        </>;
    }
}
