import React from 'react';
import { Link } from 'react-router-dom';

class OptItem extends React.Component {

    render() {
        const path = {
                pathname: '/home',
                state: { addcode: this.props.city.code }
            };
        return (
            <div>
                <Link to={path}>
                    <div className="optItem font1">{this.props.city.name}</div>
                </Link>
            </div>
        );
    }   
}

export default OptItem;