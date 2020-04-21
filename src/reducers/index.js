import {ADD_ACTIVE_CANDIDATE, UPDATE_DATES, LOAD_GRAPHS, RESET_CANDIDATES} from "../constants/action-types";
import { REMOVE_ACTIVE_CANDIDATE } from "../constants/action-types";
import { LOAD_CANDIDATES } from "../constants/action-types";
import {
    processCumulativeCandidates, processFilteredAllDatesActiveCandidates,
    processFilteredLastDateActiveCandidates
} from "../utils/reduxUtils"
import moment from "moment";

const FollowersInitialState = {
    activeCandidates: [],
    candidates:[],
    processedCandidates:[],
    cumulativeCandidates:[],
    historicCumulativeCandidates:[],
    activeDates:[moment("07/01/2019"), moment("12/10/2019")],
};

function rootReducer(state = FollowersInitialState, action) {

    if (action.type === ADD_ACTIVE_CANDIDATE) {

        const activeCandidates = state.activeCandidates.concat(action.payload);
        const processedAllDatesCandidates =
            processFilteredAllDatesActiveCandidates(state.candidates, activeCandidates, state.activeDates);
        const processedLastDateCandidates =
            processFilteredLastDateActiveCandidates(state.candidates, activeCandidates, state.activeDates);

        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedAllDatesCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedAllDatesCandidates),
            historicCumulativeCandidates: processCumulativeCandidates(processedLastDateCandidates)
        });

    } if (action.type === REMOVE_ACTIVE_CANDIDATE) {

        const activeCandidates =
            state.activeCandidates.filter((candidate) => candidate.name !== action.payload.name);
        const processedAllDatesCandidates =
            processFilteredAllDatesActiveCandidates(state.candidates, activeCandidates, state.activeDates);
        const processedLastDateCandidates =
            processFilteredLastDateActiveCandidates(state.candidates, activeCandidates, state.activeDates);

        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedAllDatesCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedAllDatesCandidates),
            historicCumulativeCandidates: processCumulativeCandidates(processedLastDateCandidates)
        });

    } if (action.type === LOAD_CANDIDATES) {
        return Object.assign({}, state, {
            candidates: action.payload,
        });

    } if (action.type === UPDATE_DATES) {

        const activeDates = state.activeDates.map((date, index) => {
            return index === 0 ? action.payload.minDate: action.payload.maxDate;
        });
        const processedAllDatesCandidates =
            processFilteredAllDatesActiveCandidates(state.candidates, state.activeCandidates, activeDates);
        const processedLastDateCandidates =
            processFilteredLastDateActiveCandidates(state.candidates, state.activeCandidates, activeDates);

        return Object.assign({}, state, {
            activeDates: activeDates,
            processedCandidates: processedAllDatesCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedAllDatesCandidates),
            historicCumulativeCandidates: processCumulativeCandidates(processedLastDateCandidates)
        });
    } if(action.type === RESET_CANDIDATES){
        return Object.assign({}, state, {
            activeCandidates: [],
            processedCandidates:[],
            cumulativeCandidates:[],
            historicCumulativeCandidates:[],
            activeDates:[moment("07/02/2019"), moment("12/10/2019")],
        });
    }

    return state;
}
export default rootReducer;
