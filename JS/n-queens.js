// The n-queens puzzle is the problem of placing `n` queens on an `n` x `n`
// chessboard such that no two queens attack each other.

// Given an integer `n`, return ALL DISTINCT SOLUTIONS to the n-queens puzzle.
// You may return the answer in any order.

// Each solution contains a distinct board configuration of the
// n-queens' placement, where "Q" and "." represent a Queen and an empty space,
// respectively.

/*

    In this puzzle, the expected output for solve(4) looks like this:
    [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]

    So, we can represent the solutions as arrays containing only the Queens' positions, like this:
    [1, 3, 0, 2]
    [2, 0, 3, 1]
*/

function isValidState(state, n) {
    // check if a solution is valid

    // sees if all queens have been placed on the board
    return state.length === n
}

function getCandidates(state, n) {
    if(state.length === 0) {
        // this returns a range from 0 to n - 1
        return [...Array(n).keys()]
    }

    // find the next position in state to populate
    const position = state.length
    const candidates = new Set([...Array(n).keys()])
    // prune down candidates that place the queen into attacks
    for(let row = 0; row < state.length; row++) {
        // discard the column if there's already a queen there
        candidates.delete(state[row])
        
        const distance = position - row
        // discard diagonals
        candidates.delete(state[row] + distance)
        candidates.delete(state[row] - distance)
    }

    return candidates
}

function search(state, solutions, n) {
    if(isValidState(state, n)) {
        const stateString = stateToString(state, n)

        solutions.push(stateString)
        // return
    }

    for(const candidate of getCandidates(state, n)) {
        // inserts new candidate at the end of the state
        state.push(candidate)
        search(state, solutions, n)
        // removes candidate from the end of the state
        state.pop()
    }
}

function stateToString(state, n) {
    let result = []

    for(const position of state) {
        let array = Array(n).fill(".")
        array[position] = "Q"

        result.push(array.join(""))
    }

    return result
}


function solve(n) {
    let solutions = []
    let state = []
    search(state, solutions, n)
    return solutions
}

console.log(solve(4))
console.log(solve(1))

// I kinda understand this code, after spending some time on a debug watching
// it run step by step, but I would not have been able to code it on my own