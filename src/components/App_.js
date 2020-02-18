import React from 'react';
import '../App.css';
import CityContainer from '../containers/cityContainer.js';
import BarContainer from '../containers/barContainer.js';



class App extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('click', () => (props.setDelIndex(-1)));     
    }

    render() {
        let addcode = "";
        if(typeof(this.props.location.state) != "undefined") {
            addcode = this.props.location.state.addcode;
        }
        return (
            <div className="App">
                <CityContainer addcode={addcode} />
                <BarContainer />       
            </div>
        );
    }
}

export default App;
