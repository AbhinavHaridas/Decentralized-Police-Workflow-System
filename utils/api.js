//Function to format the API response
const responseFormatter = (status, data, message) => {
    const res = { status, data, message };
    return res;
};

module.exports = {
    responseFormatter
};
