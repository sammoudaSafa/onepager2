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
        axios.get('http://localhost:1280/publicites')
            .then(res => this.setState({

                pubs: res.data,
            }))
            .catch(err => console.log(err));
    }

    public render() {
        const { pubs }: any = this.state;
        const pub: any = this.state.pubs?.sort(() => Math.random() - Math.random()).find(() => true);
        if (!pubs) { return 'Chargement des publicités...'; }

        const smallpub = {
            width: "200px",
            height: "200px"
        };

        const bigpub = {
            width: "300px",
            height: "250px"
        };

        return <>
            {pub &&
                <aside className='pub'>
                    <a href={pub.lien}>
                        <img src={pub.image} alt={pub.lien} className='pub' style={[smallpub, bigpub].sort(() => Math.random() - Math.random()).find(() => true)} />
                        <p>{pub.message}</p>
                    </a>
                </aside>
            }
        </>;
    }
}
