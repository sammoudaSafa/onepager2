import { CardModel } from 'common';
import React from 'react';

interface Props { card: CardModel; }

interface State {
    title: string;
    excerpt: string;
    date?: Date;
    link: string;
    featured_image_src: string;

}

export class ECardItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { title: props.card.title, excerpt: props.card.excerpt, date: props.card.date, link: props.card.link, featured_image_src: props.card.featured_image_src };
    }

    public render() {
        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

        return <article className='article'>
            <div style={{ backgroundImage: `url(${this.props.card.featured_image_src})` }} className='article__img u-margin-bottom-small'>&nbsp;</div>
            <span> {this.props.card.date.toLocaleDateString(undefined /* 'fr-ca' */, dateFormat)}</span>
            <h2 className='heading-secondary u-margin-top-small u-margin-bottom-small'> {this.props.card.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: this.props.card.excerpt.rendered }} />
            <a href={this.props.card.link} className='btn'>Lire la suite</a>
        </article>;
    }

}
