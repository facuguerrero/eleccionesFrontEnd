import * as moment from "moment";

export function processActiveCandidates(candidates, activeCandidates) {
    let data = [];
    for (let i=0; i < candidates.length; i++){
        let entry = {};
        entry["date"] = moment.unix(candidates[i].date).format("DD/MM/YYYY");
        candidates[i].counts
            .forEach(candidate => {
                    const candidateScreenName = Object.keys(candidate)[0];
                    activeCandidates.forEach(activeCandidate => activeCandidate.screenName === candidateScreenName ?
                        entry[activeCandidate.name] = candidate[candidateScreenName] : null)
                }
            );
        data.push(entry);
    }
    return data;
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

            let total = date[keys[i]];
            index > 0 ? total += cumulativeCandidates[index - 1][keys[i]] : null;
            cumulativeDate[keys[i]] = total;
        }
        cumulativeCandidates[index] = cumulativeDate;

    },0);
    return cumulativeCandidates;
}
