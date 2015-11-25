'use strict';

import React from 'react';

import formatDuration from 'utils/formatDuration.js';

class PromotionParam extends React.Component {
    render() {
        return <span>{this.props.param}<br /></span>;
    }
}

class Promotion extends React.Component {
    render() {
        const promo = this.props.promo;
        const task = this.props.task;

        return (<div className="infoPanel">
            <div className="infoPanelInner">
                <img className="promo-icon" height="16" width="16" src={window.rootURL + promo.icon}/>
                <span className="promo-name"><a href={`${window.rootURL}/${task.link}promotion`}>{promo.name}</a></span><br/>
                {promo.user != 'anonymous' ? <span className="promo-user">{promo.user} </span> : undefined}
                <span className="promo-time">{formatDuration(promo.time)}</span><br/>
                {(promo.params || []).map(param => <PromotionParam key={param} param={param}/>)}
            </div>
        </div>);
    }
}

export default class Promotions extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        if (!view.showPromotions || !task.status.promoted || !task.status.promotions) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {task.status.promotions.map(promo => <Promotion key={promo.name} {...this.props} promo={promo} />)}
        </div>);
    }
}
