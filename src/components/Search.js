import React from 'react';
import citycode from '../data/citycode.json';
import searchIcon from '../images/search.png';
import topBtn from '../images/top.png';
import { Link } from 'react-router-dom';
import OptContainer from '../containers/optContainer';
import OptList from './OptList';



function ResList(props) {
    let res = props.data;
    const resItems = res.map((item,index) => {
        return (
            <OptContainer key={item.name} city={item}/>
        );
    });
    return (
        <div className="resList">
            {resItems}
        </div>
    );
}

class AlphaBtnList extends React.Component {
    scrollTo = (alpha) => {
        let part = alpha == "searchBar" ? document.getElementById("searchBar") : document.getElementById("part_"+alpha);
        if(part) {
            part.scrollIntoView();
        }
    }

    render() {
        let alphabet = [];
        let i = 0;
        for(let key in citycode) {
            alphabet[i++] = key;
        }
        const alphaBtns = alphabet.map((alpha, index) => {
            return (
                <div onClick={() => this.scrollTo(alpha)}> 
                    {alpha} 
                </div>
            )
        });
        return (
           <div className="AlphaBtnList">
               <img src={topBtn} alt="" onClick={() => this.scrollTo("searchBar")} />
               {alphaBtns}
           </div>
        );
    }
    
}

class SearchCom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            res: []
        };
        this.isCompositions = false;
    }

    compositionstart = () => {
        this.isCompositions = false;
    }

    compositionend = () => {
        this.isCompositions = true;
    }

    search = () => {
        this.timer = setTimeout(function() {
            if(this.isCompositions) {
                let keyword = document.getElementById("cityInput").value;                
                if(keyword !== "") {
                    let res = [];
                    for(let key in citycode) {
                        let parts = citycode[key];
                        for(let j = 0; j < parts.length; j++) {
                            if(parts[j].name.indexOf(keyword) !== -1) {
                                res = res.concat([parts[j]]);
                            }
                        }
                    }
                    this.setState({
                        res: res
                    });
                } else {
                    this.setState({
                        res: []
                    });
                }            
            }
        }.bind(this),100);      
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        let res = this.state.res;
        let isDisplay = (res.length > 0) ? { display: 'none' } : { display: 'block' };
        return (
            <div className="SearchCom">
            <div id="searchBar">
                <div className="searchInput">
                    <img alt="" src={searchIcon} className="searchIcon" />
                    <input id="cityInput" className="font1" type="text" placeholder="搜索" onCompositionStart={this.compositionstart} onCompositionEnd={this.compositionend} onChange={this.search}/>
                </div>
                <div className="cancelBtn"><Link to="/home"> 取消 </Link></div>
            </div>
            <AlphaBtnList />
            <OptList style={isDisplay} />
            <ResList data={res} />
            </div>   
        );
    }
}

export default SearchCom;