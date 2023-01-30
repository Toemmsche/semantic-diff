export const UTF8_LARGE_GAMMA = 'Γ';

const UTF8_JOIN_SYMBOLS = {
    inner: {
        name: 'inner',
        symbol: '⋈',
    },
    leftouter: {
        name: 'leftouter',
        symbol: '\u27d5'
    },
    rightouter: {
        name: 'rightouter',
        symbol: '\u27d6'
    },
    fullouter: {
        name: 'fullouter',
        symbol: '\u27d7'
    },
    single: {
        name: 'single',
        symbol: '\u27d51'
    },
    leftmark: {
        name: 'leftmark',
        symbol: '\u27d5\u1D39'
    },
    rightmark: {
        name: 'rightmark',
        symbol: '\u27d6\u1D39'
    },
    leftsemi: {
        name: 'leftsemi',
        symbol: '\u22c9'
    },
    rightsemi: {
        name: 'rightsemi',
        symbol: '\u22ca'
    },
    leftanti: {
        name: 'leftanti',
        symbol: '\u25b7'
    },
    rightanti: {
        name: 'rightanti',
        symbol: '\u25c1'
    }
};
export function getJoinSymbolForType(type: string) {
    for (const mapping of Object.values(UTF8_JOIN_SYMBOLS)) {
        if (mapping.name === type) {
            return mapping.symbol;
        }
    }
    return UTF8_JOIN_SYMBOLS.inner.symbol + "?";
}
