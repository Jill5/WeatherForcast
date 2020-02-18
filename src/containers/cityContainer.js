import { connect } from 'react-redux'
import { addCity, delCity, showDetails, setDelIndex } from '../actions'
import CityList from '../components/CityList'
import axios from 'axios'

const mapStateToProps = (state, ownProps) => ({
    citydata: state.citydata,
    showIndex: state.showIndex,
    delIndex: state.delIndex,
    addcode: ownProps.addcode
})
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    addCity: async (addcode) => {
        const res = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=cc785c65a07683e1e8e7352c640bee19&city='+addcode);
        if (res.status == 200 && res.data != null) {
            dispatch(addCity({
                city: res.data.lives[0].city,
                lives: res.data.lives[0]
            }))
        }
    },
    delCity: (index) => dispatch(delCity(index)),
    showDetails: (index) => dispatch(showDetails(index)),
    setDelIndex: (index) => dispatch(setDelIndex(index))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CityList)