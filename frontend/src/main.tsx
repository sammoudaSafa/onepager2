import { CardList } from 'component/cardlist';
import { Footer } from 'component/footer';
import { Nav } from 'component/nav';
import { PubList } from 'component/publist';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<>
     <Nav />
    <CardList />
    <PubList />
    <Footer /></>,
    document.getElementById('coreContainer'));
