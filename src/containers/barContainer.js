import { connect } from 'react-redux'
import { setUnit } from '../actions'
import Bar from '../components/Bar'

const mapStateToProps = state => ({
    citydata: state.citydata
})
  
const mapDispatchToProps = dispatch => ({
    setUnit: e => dispatch(setUnit(e))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bar)