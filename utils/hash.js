// Importing Modules
const CryptoJS= require('crypto-js');

// Generating hash based on the value of each attribute of fir request
const generateHash = (firRequest) => {
    let sha256 = CryptoJS.algo.SHA256.create();

    for (let attr in firRequest) {
        const value = firRequest[attr];

        sha256.update(value.toString());
    }

    let hash = sha256.finalize();
    return hash.toString();
}


module.exports = {
    generateHash
}