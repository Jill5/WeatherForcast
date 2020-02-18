import React from 'react';
import '../App.css';
import axios from 'axios';
import localIcon from "../images/local.png";

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

  
class CityItem extends React.Component {

    render() {
      let details = null;
      let style = null;
      let localimg = null;
      let index = this.props.index;
      let citydata = this.props.appdata.citydata;
      let showIndex = this.props.appdata.showIndex;
      let showDetails = this.props.appdata.showDetails;
      let delIndex = this.props.appdata.delIndex;     
      let delCity = this.props.appdata.delCity;
      let touchstart = (index == 0) ? () => {} : this.props.appdata.touchstart;
      let touchmove = (index == 0) ? () => {} : this.props.appdata.touchmove;
      
      if(index == 0) {
        localimg = <img alt="" src={localIcon} className="localimg"/>
      }
      if(index === showIndex) {
        details = <Details lives={citydata[index].lives} />;
      }
      if(index === delIndex) {
        let offset = '-'+document.getElementsByClassName("delbtn")[0].clientWidth.toString()+'px';
        style = {
          marginLeft: offset
        };
      } else {
        style = {
          marginLeft: 0
        };
      }
      
      return (
        <div className="CityItem" >
              <div className="CityItem_ScrollWrapper">
                <div className="CityItem_LongWrapper" style={style} onTouchStart={(e) => touchstart(e)} onTouchMove={(e) => touchmove(e,index)} >
                  <div className="CityItem_NormalWrapper font2" onClick={() => showDetails(index)}>
                      <div className="CityItem_city">{localimg}{citydata[index].city}</div>
                      <div className="CityItem_temp">{citydata[index].lives.temperature}&#176;</div>                       
                  </div>
                  <div className="delbtn font1" onClick={() => delCity(index)}><div>删除</div></div>
                </div>               
              </div>       
              {details}
        </div>
      );
    }   
}
  
class CityList extends React.Component {
      constructor(props) {
          super(props);             
          this.startX = 0;
          this.startY = 0;                   
      }

      componentDidMount() {
          // 添加定位城市的数据
          this.addLocalCity();
          // 添加新增城市的数据
          let addcode = this.props.addcode;       
          if(addcode != null && addcode != "") {
            this.props.addCity(addcode);
          }
      }

      addLocalCity = async () => {
        const res = await axios.get('https://restapi.amap.com/v3/ip?ip=114.247.50.2&output=json&key=cc785c65a07683e1e8e7352c640bee19');
        if (res.status == 200 && res.data != null) {
          this.props.addCity(res.data.adcode);
        }
      }
      
      touchstart = (e) => {
          this.startX = e.changedTouches[0].pageX;
      　　this.startY = e.changedTouches[0].pageY;
      }
      
      touchmove = (e, index) => {
          e.nativeEvent.stopImmediatePropagation();
          let moveEndX = e.changedTouches[0].pageX;
      　　let moveEndY = e.changedTouches[0].pageY;
      　　let X = moveEndX - this.startX;
      　　let Y = moveEndY - this.startY;
          let width = document.getElementsByClassName("delbtn")[0].clientWidth;
          let height = document.getElementsByClassName("delbtn")[0].clientHeight;
          if(X < -width && (Y > -height || Y < height)) {   // 左滑
            this.props.setDelIndex(index);
          }
          if(X > width && (Y > -height || Y < height)) {    // 右滑
            this.props.setDelIndex(-1);
          }
      }
      
      render() {
        let AppData = {
            citydata: this.props.citydata,
            showIndex: this.props.showIndex,
            delIndex: this.props.delIndex,
            showDetails: this.props.showDetails,
            touchstart: this.touchstart,
            touchmove: this.touchmove,
            delCity: this.props.delCity
        }

          const CityItems = this.props.citydata.map((item,index) => {     
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

export default CityList;