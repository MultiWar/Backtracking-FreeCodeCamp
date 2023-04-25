// this is the template provided by the person of the video. 
// It's been adapted to JS, the original is in Python

function isValidState(state) {
    // check if a solution is valid
    return true
}

function getCandidates(state) {
    return []
}

function search(state, solutions) {
    if(isValidState(state)) {
        solutions.push(structuredClone(state))
        // return
    }

    for(const candidate of getCandidates(state)) {
        state.add(candidate)
        search(state, solutions)
        state.delete(candidate)
    }
}

function solve() {
    const solutions = []
    const state = new Set()
    search(state, solutions)
    return solutions
}