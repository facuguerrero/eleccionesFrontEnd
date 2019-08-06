import * as moment from "moment";

export function processFilteredLastDateActiveCandidates(candidates, activeCandidates, activeDates) {

    console.log(activeDates)
    //filter by dates
    const filteredCandidates = candidates.filter(candidate => {

        const date = moment.unix(candidate.date);
        return (date >= moment("07/02/2019")) &&
        (activeDates[1] === null || date <= activeDates[1].startOf("day"));

    });

    return processActiveCandidates(filteredCandidates, activeCandidates)

}

export function processFilteredAllDatesActiveCandidates(candidates, activeCandidates, activeDates) {

    //filter by dates
    const filteredCandidates = candidates.filter(candidate => {

        const date = moment.unix(candidate.date);
        // return date >= moment("07/01/2019") &&
            return (activeDates[0] === null || date >= activeDates[0].startOf("day")) &&
            (activeDates[1] === null || date <= activeDates[1].startOf("day"));

    });

    return processActiveCandidates(filteredCandidates, activeCandidates)

}

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
