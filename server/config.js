var config = {

    dev: {
        url: 'http://localhost/',
        port: 3000,
        ambiente: 'DEV'
    },

    prd: {
        url: 'http://localhost/',
        port: 3000,
        ambiente: 'PRD'
    },
}

exports.get = function get(ambiente) {

    if (ambiente.toLowerCase() === 'dev') {
        return config.dev
    }

    if (ambiente.toLowerCase() === 'prd') {
        return config.prd
    }
}