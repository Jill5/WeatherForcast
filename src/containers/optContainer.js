import { connect } from 'react-redux'
import { addCity } from '../actions'
import OptItem from '../components/OptItem'

const mapStateToProps = (state, ownProps) => ({
    city: ownProps.city
})
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    addCity: (addcode) => dispatch(addCity(addcode))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptItem)