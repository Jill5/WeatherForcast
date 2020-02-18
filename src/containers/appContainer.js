import { connect } from 'react-redux'
import { setDelIndex } from '../actions'
import App from '../components/App_'

const mapStateToProps = (state, ownProps) => ({
    //addcode: ownProps.location.state.addcode
})
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    setDelIndex: (index) => dispatch(setDelIndex(index))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)