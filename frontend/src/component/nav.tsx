import React from 'react';
interface Props { }
interface State { }
export class Nav extends React.Component<Props, State> {
    public render() {
        return <header className='header'>
            <div className='flex header__items container'>
                <div className='header__items--logo'>
                    <img src='img/effix-logo.png' alt='logo' />
                </div>
                <div className='header__logo-mobile'>
                    <img src='img/effix-logo-mobile.png' alt='logo' />
                </div>
                <h3 className='heading-tertiary'>Actualités évènementielles</h3>
                <a href='http://effix-commerce.bianka.devwebgarneau.com/' className='btn btn--light'>Infolettre</a>
            </div>
        </header>;
    }
}
