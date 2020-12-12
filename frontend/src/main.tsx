import { CardList } from 'component/cardlist';
import { Footer } from 'component/footer';
import { Nav } from 'component/nav';
import { PubList } from 'component/publist';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(<>
     <Nav />
     <PubList />
     <CardList />
     <Footer /></>,
     document.getElementById('coreContainer'));
