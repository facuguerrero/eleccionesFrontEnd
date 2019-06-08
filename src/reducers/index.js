import {ADD_ACTIVE_CANDIDATE, UPDATE_DATES} from "../constants/action-types";
import { REMOVE_ACTIVE_CANDIDATE } from "../constants/action-types";
import { LOAD_CANDIDATES } from "../constants/action-types";
import { processActiveCandidates, processCumulativeCandidates} from "../utils/reduxUtils"

const initialState = {
    activeCandidates: [],
    candidates:[],
    processedCandidates:[],
    cumulativeCandidates:[],
    activeDates:[null, null],
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_ACTIVE_CANDIDATE) {
        const activeCandidates = state.activeCandidates.concat(action.payload);
        const processedCandidates = processActiveCandidates(state.candidates, activeCandidates, state.activeDates);
        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedCandidates)
        });

    } if (action.type === REMOVE_ACTIVE_CANDIDATE) {
        const activeCandidates =
            state.activeCandidates.filter((candidate) => candidate.name !== action.payload.name);
        const processedCandidates = processActiveCandidates(state.candidates, activeCandidates, state.activeDates);
        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedCandidates)
        });

    } if (action.type === LOAD_CANDIDATES) {
        return Object.assign({}, state, {
            candidates: state.activeCandidates.concat(action.payload)
        });

    } if (action.type === UPDATE_DATES) {
        const activeDates = state.activeDates.map((date, index) => {
            return index === 0 ? action.payload.minDate: action.payload.maxDate;
        });
        const processedCandidates = processActiveCandidates(state.candidates, state.activeCandidates, activeDates);
        return Object.assign({}, state, {
            activeDates: activeDates,
            processedCandidates: processedCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedCandidates)
        });
    }

    return state;
}
export default rootReducer;
