import * as moment from "moment";

export function processActiveCandidates(candidates, activeCandidates) {

    return candidates.map(candidate => {
        let entry = {};
        entry["date"] = moment.unix(candidate.date).format("DD/MM/YYYY");
        activeCandidates.forEach(activeCandidate => entry[activeCandidate.name] = candidate[activeCandidate.screenName])
        return entry;
    });

}

export function processCumulativeCandidates(processedCandidates) {
    let cumulativeCandidates = [];
    processedCandidates.forEach( (date, index) => {

        let cumulativeDate = {};
        cumulativeDate["date"] = date.date;
        let keys = Object.keys(date);
        const maxLen = keys.length;

        //it goes from 1 as it ignores the date
        for (let i = 1; i < maxLen; i++){

            //if one day the candidate doesn't have a value
            let total = !date[keys[i]] ? 0 : date[keys[i]];

            index > 0 ? total += cumulativeCandidates[index - 1][keys[i]] : null;
            cumulativeDate[keys[i]] = total;
        }
        cumulativeCandidates[index] = cumulativeDate;

    },0);
    return cumulativeCandidates;
}
