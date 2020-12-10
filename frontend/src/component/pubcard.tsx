import { PubliciteModel } from 'common';
import React from 'react';

interface Props { pub: PubliciteModel; }

interface State {
    publiciteId: number;
    lien: string ;
    Image: string ;

}

export class PubCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { publiciteId:props.pub.publiciteId, lien: props.pub.lien, Image:props.pub.Image };
    }

    public render() {

        return <div>
            <h2> {this.props.pub.lien}</h2>
            <div style={{ backgroundImage: `url(${this.props.pub.Image})`}} className='article__img u-margin-bottom-small' >&nbsp;</div>

        </div>
    }

}
