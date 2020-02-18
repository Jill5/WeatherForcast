const initialState = {
    citydata: [],
    showIndex: -1,
    delIndex: -1
};

function isExist(citydata, city) {
    for(let i = 0; i < citydata.length; i++) {
        if(citydata[i].city === city) {
            return true;
        }
    }
    return false;
}


const cityReducer = (state = initialState, action) => {
    let citydata = state.citydata.slice();
    let showIndex = state.showIndex;

    switch (action.type) {
        case 'ADD_CITY':
            if(!isExist(citydata, action.newCityData.city)) {
                return Object.assign({}, state, {
                    citydata: [
                        ...state.citydata,
                        action.newCityData
                    ]
                })
            } else {
                return state
            }       
        case 'DEL_CITY':    
            citydata.splice(action.delIndex,1);
            if(showIndex == action.delIndex) {
                showIndex = -1;
            } else if(showIndex > action.delIndex) {
                showIndex -= 1;
            }
            return Object.assign({}, state, {
                citydata: citydata,
                showIndex: showIndex
            })
        case 'SET_UNIT':
            if(action.unit === "cen") {
                for(let i = 0; i < citydata.length; i++) {
                    let cen = Math.round( (5/9) * (citydata[i].lives.temperature-32) );
                    citydata[i].lives.temperature = cen;
                }
            } else {
                for(let i = 0; i < citydata.length; i++) {
                    let fah = Math.round( (9/5) * citydata[i].lives.temperature + 32 );
                    citydata[i].lives.temperature = fah;
                }
            }
            return Object.assign({}, state, {
                citydata: citydata 
            })
        case 'SHOW_DETAILS':
            return Object.assign({}, state, {
                showIndex: (action.showIndex !== showIndex) ? action.showIndex : -1
            })
        case 'SET_DEL_INDEX':
            return Object.assign({}, state, {
                delIndex: action.delIndex 
            })
        default:
            return state
    }
}

export default cityReducer