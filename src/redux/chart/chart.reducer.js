import { chartActionTypes } from './chart.actionTypes'
import { generateLabels } from './utils/generateLabels'
import { generateTitle } from './utils/generateTitle'
import { generateData } from './utils/generateData'
import { checkSort } from './utils/checkSort'

const INITIAL_STATE = {
    
    color: 'rgba(241, 60, 32, 0.8)',
    obszar: 'polska',
    rok: 2019,
    rokPoczatkowy: 2015,
    rokKoncowy: 2019,
    wskaznik: 'liczbaWypadkow',
    rodzajSorta: 'alfabetycznie',
    labelsForTheGraph: generateLabels('polska', 2019, '', '', 'alfabetycznie'),
    dataForTheGraph: generateData('polska' , 2019, 'liczbaWypadkow', '', '', 'alfabetycznie'),
    title: generateTitle('polska' , 2019,'liczbaWypadkow', '', ''),
    values: true,
    average: false,
    animation: 1000,
    grid: true,
}


const chartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case chartActionTypes.SELECT_OBSZAR:
            return {
                ...state,
                animation: 1000,
                obszar: action.payload,      
                rok: action.payload !== 'polska' ? 'okres' : state.rok,
                rodzajSorta: checkSort(action.payload, state.rok, state.rodzajSorta),
                title: generateTitle(action.payload , state.rok, state.wskaznik, state.rokPoczatkowy, state.rokKoncowy),
                labelsForTheGraph: generateLabels(action.payload , state.rok, state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                dataForTheGraph: generateData(action.payload , state.rok, state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                
            }

        case chartActionTypes.SELECT_ROK:
            return {
                ...state,
                animation: 1000,
                rok: action.payload,
                rodzajSorta: checkSort(state.obszar, action.payload, state.rodzajSorta),
                labelsForTheGraph: generateLabels(state.obszar , action.payload , state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                dataForTheGraph: generateData(state.obszar , action.payload , state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                title: generateTitle(state.obszar , action.payload , state.wskaznik, state.rokPoczatkowy, state.rokKoncowy)
            }

        case chartActionTypes.SELECT_ROK_POCZATKOWY:
            return {
                ...state,
                animation: 1000,
                rokPoczatkowy: action.payload,
                rok: 'okres',
                labelsForTheGraph: generateLabels(state.obszar , state.rok, state.wskaznik, action.payload, state.rokKoncowy, state.rodzajSorta),
                dataForTheGraph: generateData(state.obszar , state.rok, state.wskaznik, action.payload, state.rokKoncowy, state.rodzajSorta),
                title: generateTitle(state.obszar , state.rok, state.wskaznik, action.payload, state.rokKoncowy )
            }

        case chartActionTypes.SELECT_ROK_KONCOWY:
            return {
                ...state,
                animation: 1000,
                rokKoncowy: action.payload,
                rok: 'okres',
                labelsForTheGraph: generateLabels(state.obszar , state.rok, state.wskaznik, state.rokPoczatkowy, action.payload, state.rodzajSorta),
                dataForTheGraph: generateData(state.obszar , state.rok, state.wskaznik, state.rokPoczatkowy, action.payload, state.rodzajSorta),
                title: generateTitle(state.obszar , state.rok, state.wskaznik, state.rokPoczatkowy, action.payload )
            }

        case chartActionTypes.SELECT_WSKAZNIK:
            return {
                ...state,
                animation: 1000,
                wskaznik: action.payload,
                labelsForTheGraph: generateLabels(state.obszar , state.rok, action.payload, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                dataForTheGraph: generateData(state.obszar , state.rok, action.payload, state.rokPoczatkowy, state.rokKoncowy, state.rodzajSorta),
                title: generateTitle(state.obszar , state.rok, action.payload, state.rokPoczatkowy, state.rokKoncowy )

            }

        case chartActionTypes.SELECT_SORT:
            return {
                ...state,
                animation: 1000,
                rodzajSorta: action.payload,
                labelsForTheGraph: generateLabels(state.obszar, state.rok, state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, action.payload),
                dataForTheGraph: generateData(state.obszar, state.rok, state.wskaznik, state.rokPoczatkowy, state.rokKoncowy, action.payload),
            }
        case chartActionTypes.SELECT_COLOR:
            return {
                ...state,
                animation: 0,
                color: action.payload.hex
            }
        case chartActionTypes.TOGGLE_VALUES:
            return {
                ...state,
                animation: 0,
                values: !state.values
            }
        case chartActionTypes.TOGGLE_AVG:
            return {
                ...state,
                animation: 0,
                average: !state.average
            }
        case chartActionTypes.TOGGLE_GRID:
            return {
                ...state,
                animation: 0,
                grid: !state.grid
            }
 
        default:
            return {
                ...state
            }
    }

}

export default chartReducer