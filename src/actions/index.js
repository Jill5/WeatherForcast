export const addCity = newCityData => {
    return {
        type: 'ADD_CITY',
        newCityData: newCityData
    }           
}

export const delCity = index => {
    return {
        type: 'DEL_CITY',
        delIndex: index
    }
}

export const setUnit = e => {
    if(e.target.id === "cen" && document.getElementById("cen").className === "unselected_unit font15") {
        document.getElementById("cen").className = "selected_unit font15";
        document.getElementById("fah").className = "unselected_unit font15";
        return {
            type: 'SET_UNIT',
            unit: "cen"
        };
  
    } else if(e.target.id === "fah" && document.getElementById("fah").className === "unselected_unit font15") {
        document.getElementById("cen").className = "unselected_unit font15";
        document.getElementById("fah").className = "selected_unit font15";
        return {
            type: 'SET_UNIT',
            unit: "fah"
        }
    }
}

export const showDetails = index => {
    return {
        type: 'SHOW_DETAILS',
        showIndex: index
    }
}

export const setDelIndex = index => {
    return {
        type: 'SET_DEL_INDEX',
        delIndex: index
    }
}