'use strict';

import React from 'react';

import formatDuration from 'utils/formatDuration.js';

class Promotion extends React.Component {
    render() {
        const {promo: {icon, name, user, params, time}, link} = this.props;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <img className="promo-icon" height="16" width="16" src={window.rootURL + icon}/>
                <span className="promo-name"><a href={`${window.rootURL}/${link}promotion`}>{name}</a></span><br/>
                {user != 'anonymous' ? <span className="promo-user">{user} </span> : undefined}
                <span className="promo-time">{formatDuration(time)}</span><br/>
                {(params || []).map(param => <span key={param}>{param}<br /></span>)}
            </div>
        </div>);
    }
}

export default class Promotions extends React.Component {
    render() {
        const {view: {showPromotions}, task: {link, status: {promotions, promoted}}} = this.props;

        if (!showPromotions || !promoted || !promotions || promotions.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {promotions.map(promo => <Promotion key={promo.name} link={link} promo={promo} />)}
        </div>);
    }
}
