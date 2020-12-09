import { Api } from 'api';
import { PubliciteModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ publiciteId: string; }> { }
interface State {
    publicite?: PubliciteModel;
    pubs: PubliciteModel[];
    isChecked: boolean;
    offline: string;
    online: string;
}
// bablablabla test

export class Editor extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;

    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = {
            pubs: [],
            isChecked: true,
            offline: '',
            online: ''
        };
    }

    public async componentDidMount() {
        const publiciteId = this.props.match.params.publiciteId;
        const publicite = PubliciteModel.fromJSON(await this.api.getJson(`/publicites/${publiciteId}`));
        this.setState({ publicite });
    }

    public render() {
        const { publicite } = this.state;
        const { user } = this.context;

        return <section className='editor'>
            <Link to='/'>Liste des clients</Link>
            <h2>Bonjour [{user?.username}]</h2>
            <div className='ad-info'>
                <p><span className='bold'>Nom : </span>{publicite?.nom_client}</p>
                <p><span className='bold'>Status de la publicité : </span> <span className={publicite?.status ? 'online' : 'offline'}>{publicite?.status === 1 ? 'En ligne' : ' Hors ligne'} </span></p>
            </div>

            <form onSubmit={this.updatePublicite}>
                <div className='preview'>
                    <h3>Preview</h3>
                    <div className='preview-flex'>
                        <div className='preview-flex-item'>
                            <h4>300x250</h4>
                            <div className='preview-350-250'>
                                <p>{publicite?.message}</p>
                                <a href={publicite?.lien}>
                                    <img className='large' src={publicite?.image} alt='background-publicite' />
                                </a>
                            </div>
                        </div>

                        <div className='preview-flex-item'>
                            <h4>300x250</h4>

                            <div className='preview-img-small'>
                                <p>{publicite?.message}</p>
                                <a href={publicite?.lien}>
                                    <img className='small' src={publicite?.image} alt='background-publicite' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='Lien'>Lien: </label>
                    <input type='text' name='Lien' value={publicite?.lien ?? ''} onChange={e => {
                        publicite!.lien = e.currentTarget.value;
                        this.setState({ publicite });
                    }} />


                    <label htmlFor='Texte'>Texte: </label>
                    <input type='text' name='Texte' value={publicite?.message ?? ''} onChange={e => {
                        publicite!.message = e.currentTarget.value;
                        this.setState({ publicite });
                    }} />
                </div>

                <p>Image (1 choix):</p>
                <div className='container-images'>
                    <div className={publicite?.image === '/img/image1.jpg' ? 'images select' : 'images'}>
                        <label htmlFor='image1'> <img src='/img/image1.jpg' /> </label>
                        <input type='radio' id='image1' name='image' value='/img/image1.jpg' checked={publicite?.image === '/img/image1.jpg' ? this.state.isChecked : false} onChange={e => {
                            publicite!.image = e.currentTarget.value;
                            this.setState({ publicite });
                        }} />
                    </div>
                    <br />

                    <div className={publicite?.image === '/img/image2.jpg' ? 'images select' : 'images'}>
                        <label htmlFor='image2'><img src='/img/image2.jpg' /></label>
                        <input type='radio' id='imgage2' name='image' value='/img/image2.jpg' checked={publicite?.image === '/img/image2.jpg' ? this.state.isChecked : false} onChange={e => {
                            publicite!.image = e.currentTarget.value;
                            this.setState({ publicite });
                        }} />
                    </div>
                    <br />

                    <div className={publicite?.image === '/img/image3.jpg' ? 'images select' : 'images'}>
                        <label htmlFor='image3'><img src='/img/image3.jpg' /></label>
                        <input type='radio' id='image3' name='image' value='/img/image3.jpg' checked={publicite?.image === '/img/image3.jpg' ? this.state.isChecked : false} onChange={e => {
                            publicite!.image = e.currentTarget.value;
                            this.setState({ publicite });
                        }} />
                    </div>
                    <br />

                    <div className={publicite?.image === '/img/image4.jpg' ? 'images select' : 'images'}>
                        <label htmlFor='image3'><img src='/img/image4.jpg' /></label>
                        <input type='radio' id='image3' name='image' value='/img/image4.jpg' checked={publicite?.image === '/img/image4.jpg' ? this.state.isChecked : false} onChange={e => {
                            publicite!.image = e.currentTarget.value;
                            this.setState({ publicite });
                        }} />
                    </div>
                    <br />

                    <div className={publicite?.image === '/img/image5.jpg' ? 'images select' : 'images'}>
                        <label htmlFor='image3'><img src='/img/image5.jpg' /></label>
                        <input type='radio' id='image3' name='image' value='/img/image5.jpg' checked={publicite?.image === '/img/image5.jpg' ? this.state.isChecked : false} onChange={e => {
                            publicite!.image = e.currentTarget.value;
                            this.setState({ publicite });
                        }} />
                    </div>
                    <br />
                </div>
                <div className='field'>
                    <label htmlFor='status'>Status de la publicité</label>
                    <select id='status' onChange={e => {
                        publicite!.status = Number(e.currentTarget.value);
                        this.setState({ publicite });
                    }}>
                        <option value='null'>--Status--</option>
                        <option value='0'>Hors ligne</option>
                        <option value='1'>En ligne</option>
                    </select>
                </div>
                <button type='submit'> Enregistrer </button>
            </form>
        </section>;
    };

    private updatePublicite = async (e: React.FormEvent) => {
        e.preventDefault();
        const pub = this.state.publicite;
        let newPub: PubliciteModel | undefined = undefined;

        newPub = PubliciteModel.fromJSON(await this.api.putGetJson('/publicites', pub!.publiciteId, pub));
        alert('Modifications enregistrés');

        const pubs = (await this.api.getJson('/')).map(PubliciteModel.fromJSON);
        this.setState({ pubs, publicite: newPub });

    };
}
