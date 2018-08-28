const path = require('path');

module.exports = class Utils {

    static getUnixStylePath(pathStr) {
        return pathStr.split(path.sep).splice(1).join('/');
    }

}