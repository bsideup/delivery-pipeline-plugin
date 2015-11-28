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
                <img className="promo-icon" height="16" width="16" src={window.rootURL + promo.get('icon')}/>
                <span className="promo-name"><a href={`${window.rootURL}/${task.get('link')}promotion`}>{promo.get('name')}</a></span><br/>
                {promo.get('user') != 'anonymous' ? <span className="promo-user">{promo.get('user')} </span> : undefined}
                <span className="promo-time">{formatDuration(promo.get('time'))}</span><br/>
                {(promo.get('params') || []).map(param => <PromotionParam key={param} param={param}/>)}
            </div>
        </div>);
    }
}

export default class Promotions extends React.Component {
    render() {
        const view = this.props.view;
        const task = this.props.task;

        const status = task.get('status');
        const promotions = status.get('promotions');
        if (!view.get('showPromotions') || !status.get('promoted') || !promotions || promotions.isEmpty()) {
            return false;
        }

        return (<div className="infoPanelOuter">
            {promotions.map(promo => <Promotion key={promo.get('name')} {...this.props} promo={promo} />)}
        </div>);
    }
}
