import React from 'react';
import citycode from '../data/citycode.json';
import OptContainer from '../containers/optContainer';


function OptAlphaPart(props) {
    let alpha = props.alpha;
    const optItems = citycode[alpha].map((item,index) => {
        return (
            <OptContainer key={item.name} city={item}/>
        );
    });
    return (
        <div className="alphaPart" id={"part_"+alpha} >
            <div className="alphaTitle">{alpha}</div>
            {optItems}
        </div>
    );
}

function OptList(props) {
    let alphabet = [];
    let i = 0;
    for(let key in citycode) {
        alphabet[i++] = key;
    }
    const parts = alphabet.map((alpha,index) => {
        return (
            <OptAlphaPart key={alpha} alpha={alpha}/>
        );
    });
    return (
        <div className="optList" style={props.style}>
            {parts}
        </div>
    );
}

export default OptList;