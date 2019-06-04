import { ADD_ACTIVE_CANDIDATE } from "../constants/action-types";
import { REMOVE_ACTIVE_CANDIDATE } from "../constants/action-types";
import { LOAD_CANDIDATES } from "../constants/action-types";
import { processActiveCandidates, processCumulativeCandidates} from "../utils/reduxUtils"

const initialState = {
    activeCandidates: [],
    candidates:[],
    processedCandidates:[],
    cumulativeCandidates:[],
};

function rootReducer(state = initialState, action) {

    if (action.type === ADD_ACTIVE_CANDIDATE) {
        const activeCandidates = state.activeCandidates.concat(action.payload);
        const processedCandidates = processActiveCandidates(state.candidates, activeCandidates);
        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedCandidates)
        });

    } if (action.type === REMOVE_ACTIVE_CANDIDATE) {
        const activeCandidates =
            state.activeCandidates.filter((candidate) => candidate.name !== action.payload.name);
        const processedCandidates = processActiveCandidates(state.candidates, activeCandidates);
        return Object.assign({}, state, {
            activeCandidates: activeCandidates,
            processedCandidates: processedCandidates,
            cumulativeCandidates: processCumulativeCandidates(processedCandidates)
        });

    } if (action.type === LOAD_CANDIDATES) {
        return Object.assign({}, state, {
            candidates: state.activeCandidates.concat(action.payload)
        });
    }

    return state;
}
export default rootReducer;
