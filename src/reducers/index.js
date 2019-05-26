import { ADD_ACTIVE_CANDIDATE } from "../constants/action-types";
import { REMOVE_ACTIVE_CANDIDATE } from "../constants/action-types";
import { LOAD_CANDIDATES } from "../constants/action-types";

const initialState = {
    activeCandidates: [],
    candidates:[]
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ACTIVE_CANDIDATE) {
        return Object.assign({}, state, {
            activeCandidates: state.activeCandidates.concat(action.payload)
        });
    } if (action.type === REMOVE_ACTIVE_CANDIDATE) {
        return Object.assign({}, state, {
            activeCandidates: state.activeCandidates.filter((candidate) => candidate.candidate !== action.payload.candidate)
        });
    } if (action.type === LOAD_CANDIDATES) {
        return Object.assign({}, state, {
            candidates: state.activeCandidates.concat(action.payload)
        });
    }
    return state;
}
export default rootReducer;
