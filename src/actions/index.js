import axios from 'axios';
import {ADD_ACTIVE_CANDIDATE, LOAD_GRAPHS, RESET_CANDIDATES} from "../constants/action-types";
import { REMOVE_ACTIVE_CANDIDATE } from "../constants/action-types";
import { LOAD_CANDIDATES } from "../constants/action-types";
import { UPDATE_DATES } from "../constants/action-types";

export function addActiveCandidate(payload) {
    return { type: ADD_ACTIVE_CANDIDATE, payload };
}

export function removeActiveCandidate(payload) {
    return { type: REMOVE_ACTIVE_CANDIDATE, payload };
}

export function getCandidates() {
    return function(dispatch) {
        // return axios.get('http://localhost:8080/candidates')
        // 'http://0.0.0.0:9290/src/jsonsDummy/candidates_dummy.json',
        return axios.get(
            'http://localhost:8080/candidates',
            {
            proxy: false
            })
            .then((response) => {
                dispatch({ type: LOAD_CANDIDATES, payload: response.data });
            })
            .catch((error) => {
                return error;
            });
    };
}

export function resetCandidates() {
    return { type: RESET_CANDIDATES };
}

export function getGraphs() {
    return function(dispatch) {
        return axios.get('/static/graph-example.json')
            .then((response) => {
                dispatch({ type: LOAD_GRAPHS, payload: response.data });
            })
            .catch((error) => {
                return error;
            });
    };
}

export function updateDate(payload) {
    return { type: UPDATE_DATES, payload };
}
