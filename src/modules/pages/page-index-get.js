const path = require('path');

module.exports = (req, res) => {
    return res.sendFile(path.resolve(__filename + "/../../../../public/signup.html"));
}; 