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

function CityItem(props) {
  let details = null;
  let style = null;
  let index = props.index;
  let citydata = props.appdata.citydata;
  let showIndex = props.appdata.showIndex;
  let delIndex = props.appdata.delIndex;
  let showDetails = props.appdata.showDetails;
  let delCity = props.appdata.delCity;
  let touchstart = props.appdata.touchstart;
  let touchmove = props.appdata.touchmove;

  if(index === showIndex) {
    details = <Details lives={citydata[index].lives} forecast={citydata[index].forecast}/>;
  }
  // if(index === delIndex) {
  //   let offset = '-'+document.getElementsByClassName("delbtn")[0].clientWidth.toString()+'px';
  //   style = {
  //     marginLeft: offset
  //   };
  // } else {
  //   style = {
  //     marginLeft: 0
  //   };
  // }

  return (
    <div className="CityItem" >
          <div className="CityItem_ScrollWrapper">
            <div className="CityItem_LongWrapper"  onTouchStart={(e) => touchstart(e)} onTouchMove={(e) => touchmove(e,index)} style={style}>
              <div className="CityItem_NormalWrapper font2" onClick={() => showDetails(index)}>
                  <div className="CityItem_city">{citydata[index].city}</div>
                  <div className="CityItem_temp">{citydata[index].lives.temperature}&#176;</div>                       
              </div>
              <div className="delbtn font1" onClick={() => delCity(index)}><div>删除</div></div>
            </div>               
          </div>       
          {details}
    </div>
  );
}

class CityList extends React.Component {

  render() {
    let citydata = this.props.data;
    let AppData = {
      citydata: citydata,
      showIndex: this.props.showindex,
      delIndex: this.props.delindex,
      showDetails: this.props.showfunc,
      delCity: this.props.delfunc,
      touchstart: this.props.touchstart,
      touchmove: this.props.touchmove
    }
    
    const CityItems = citydata.map((item,index) => {     
      return (
        <CityItem key={item.city} index={index} appdata={AppData}></CityItem>
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
      showIndex: -1,
      delIndex: -1
    };   
    this.startX = 0;
    this.startY = 0;
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
      }.bind(this)
    });
  }

  delCity(i) {
    let citydata = this.state.citydata.slice();
    let showIndex = this.state.showIndex;
    citydata.splice(i,1);
    if(showIndex === i) {
      showIndex = -1;
    } else if(showIndex > i) {
      showIndex -= 1;
    }
    this.setState({
      citydata: citydata,
      showIndex: showIndex,
      delIndex: -1
    });
  }

  moveDelBtn() {
    this.setState({
      delIndex: -1
    });
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
  }

  touchstart(e) {
    this.startX = e.changedTouches[0].pageX;
　　this.startY = e.changedTouches[0].pageY;
  }

  touchmove(e, index) {
    e.nativeEvent.stopImmediatePropagation();
    let moveEndX = e.changedTouches[0].pageX;
　　let moveEndY = e.changedTouches[0].pageY;
　　let X = moveEndX - this.startX;
　　let Y = moveEndY - this.startY;
    let width = document.getElementsByClassName("delbtn")[0].clientWidth;
    let height = document.getElementsByClassName("delbtn")[0].clientHeight;
    if(X < -width && (Y > -height || Y < height)) {   // 左滑
      // this.setState({
      //   delIndex: index
      // });
      let offset = '-'+document.getElementsByClassName("delbtn")[0].clientWidth.toString()+'px';
      document.getElementsByClassName("CityItem_LongWrapper")[index].setAttribute("margin-left",offset);   
    }
    if(X > width && (Y > -height || Y < height)) {    // 右滑
      // this.setState({
      //   delIndex: -1
      // });
      document.getElementsByClassName("CityItem_LongWrapper")[index].setAttribute("margin-left",0); 
    }
  }
  
  componentWillMount() {
    this.addCity('110000');
    document.addEventListener('click', this.moveDelBtn.bind(this));
  }

  render() {
    return (
      <div className="App">
        <CityList data={this.state.citydata} showindex={this.state.showIndex} delindex={this.state.delIndex} showfunc={index => this.showDetails(index)} delfunc={(index) => this.delCity(index)} touchstart={(e) => this.touchstart(e)} touchmove={(e,i) => this.touchmove(e,i)}/>
        <AddComponent addfunc={code => this.addCity(code)}></AddComponent>
      </div>
    );
  }
  
}

export default App;
