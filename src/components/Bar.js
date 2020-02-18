import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import addIcon from "../images/add.png";

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.setUnit = props.setUnit;
    }

    render() {
        return (
            <div className="bar">
                <div>
                    <div id="cen" className="selected_unit font15" onClick={(e) => this.setUnit(e)}> &#176;C </div>
                    <div id="fah" className="unselected_unit font15" onClick={(e) => this.setUnit(e)}> &#176;F </div>
                </div>
                <Link to="/search"><img alt="add" src={addIcon} className="addBtn"/></Link>
            </div>
        )
    }
}

export default Bar;