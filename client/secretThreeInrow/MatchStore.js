module.exports = function (deps) {

    const route = deps.route;

    return {
        namespaced: true,
        state: {
            map: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ],
            visibleMarks: [],
            players: ['Agge', 'Lulle'],
            currentPlayer: 'Agge',
            colors: [
                'white',
                'blue',
                'tomato'
            ],
            pause: false
        },
        getters: {
            currentPlayerNumber,
            isMarkVisible
        },
        mutations: {},
        actions: {
            placeMark
        }
    };

    function currentPlayerNumber(state) {
        return state.players.indexOf(state.currentPlayer) + 1;
    }

    function isMarkVisible(state, getters) {
        return (cell, x, y) => {
            return getters.currentPlayerNumber === cell
                || state.visibleMarks.some(m => m.x === x && m.y === y);
        };
    }

    async function placeMark({ state, getters }, { x, y }) {
        let currentPlayerIndex = state.players.indexOf(state.currentPlayer);
        if (state.map[y][x] !== 0) {
            if (state.map[y][x] !== getters.currentPlayerNumber) {
                state.visibleMarks.push({ x, y });
            }
            return;
        }

        state.map[y][x] = currentPlayerIndex + 1;
        state.map = { ...state.map };

        await new Promise(resolve => setTimeout(resolve, 1200));
        state.pause = true;
        await new Promise(resolve => setTimeout(resolve, 3000));
        state.pause = false;

        state.currentPlayer = state.players[currentPlayerIndex + 1];
        if (!state.currentPlayer) state.currentPlayer = state.players[0];
    }
}

function capitalize(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
}