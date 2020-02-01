import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

function Details(props) {
  return (
    <div className="details font1">
      <div className="details_wea">
        <div>{props.lives.weather}</div>
        <div className="font3">3&#176;-11&#176;</div>
      </div>
      <div>
        <span>风</span> 
        <span className="font15"> &nbsp;{props.lives.windddirection} &nbsp;{props.lives.windpower}公里/小时 </span>
      </div>
      <div>
        <span>湿度</span> 
        <span className="font15"> &nbsp;{props.lives.humidity}% </span>
      </div>
    </div>
  );
}

class AddComponent extends React.Component {
  add() {
    let citycode = document.getElementById("inCode").value;
    console.log(citycode);
    this.props.addfunc(citycode);
  }

  render() {
    return (
      <div className="addcomp font2">
        <input type='text' id="inCode"></input>
        <button onClick={() => this.add()}>添加城市</button>
      </div>
    );
  }
}

class CityList extends React.Component {

  render() {
    let citydata = this.props.data;
    let showIndex = this.props.index;
    let showDetails = this.props.showfunc;

    const CityItems = citydata.map((item,index) => {
      let details = null;
      if(index === showIndex) {
        details = <Details lives={citydata[index].lives} forecast={citydata[index].forecast}/>;
      }
      return (
        <div className="CityItem" key={item.city} onClick={() => showDetails(index)}>
          <div className="CityItem_ScrollWrapper">
              <div className="CityItem_LongWrapper" >
                <div className="CityItem_NormalWrapper font2">
                  <div className="CityItem_city">{citydata[index].city}</div>
                  <div className="CityItem_temp">{citydata[index].lives.temperature}&#176;</div>                       
                </div>
                <div className="delbtn font1" onClick={() => this.props.delfunc(index)}>删除</div>  
              </div>
          </div>       
          {details}
        </div>
      );
    });

    return (
      <div className="CityList">
        {CityItems}
      </div>
    ); 
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citydata: [],
      showIndex: -1
    };   
  }

  isExist(city) {
    let citydata = this.state.citydata;
    for(let i = 0; i < citydata.length; i++) {
      if(citydata[i].city == city) {
        return true;
      }
    }
    return false;
  }

  addCity(citycode) {
    this.serverRequest = $.ajax({
      type: 'GET',
      url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=cc785c65a07683e1e8e7352c640bee19&city='+citycode,
      dataType: 'JSON',
      error: function () {
          alert('网络错误');
      },
      success: function (res) {
        if(this.isExist(res.lives[0].city)) {
          alert("已添加该城市");
          return;
        }
        let citydata = this.state.citydata.slice();
        this.setState({
            citydata: citydata.concat([{
              city: res.lives[0].city,
              lives: res.lives[0],
              forecast: res.forecast
            }]),
            showIndex: this.state.showIndex        
        });
        console.log(this.state.showIndex);
      }.bind(this)
    });
  }

  delCity(i) {
    let citydata = this.state.citydata.slice();
    let index = this.state.showIndex;
    citydata.splice(i,1);
    if(index == i) {
      index = -1;
    }
    this.setState({
      citydata: citydata,
      showIndex: index
    });
    console.log(this.state.showIndex);
  }

  showDetails(index) {
    let showInd = this.state.showIndex;
    if(index !== showInd) {
      this.setState({
        showIndex: index
      });
    } else {
      this.setState({
        showIndex: -1
      });
    }   
    console.log(this.state.showIndex);
  }
  
  componentWillMount() {
    this.addCity('110000');
  }

  render() {
    return (
      <div className="App">
        <CityList data={this.state.citydata} index={this.state.showIndex} showfunc={index => this.showDetails(index)} delfunc={(index) => this.delCity(index)}/>
        <AddComponent addfunc={code => this.addCity(code)}></AddComponent>
      </div>
    );
  }
  
}

export default App;
