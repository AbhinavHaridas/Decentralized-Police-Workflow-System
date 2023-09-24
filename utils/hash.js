// Importing Modules
const CryptoJS= require('crypto-js');

// Generating hash based on the value of important attribute of fir request
const generateHash = (firImpDetails) => {
    let sha256 = CryptoJS.algo.SHA256.create();

    for (let attr in firImpDetails) {
        const value = firImpDetails[attr];

        sha256.update(value.toString());
    }

    let hash = sha256.finalize();
    return hash.toString();
}


module.exports = {
    generateHash
}