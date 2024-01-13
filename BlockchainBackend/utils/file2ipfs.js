const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const file2ipfs = async (path) => {
    try {
        let data = new FormData();
        data.append('file', fs.createReadStream(path));
        data.append('pinataOptions', '{"cidVersion": 0}');

        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            headers: {
                'Authorization': `Bearer ${process.env.PINATA_JWT}`
            }
        })

        return {
            data: res.data,
            msg: `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
   file2ipfs
}