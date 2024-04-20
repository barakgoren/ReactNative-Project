import uuid from 'react-native-uuid';

class Shift {
    constructor(startTime, endTime) {
        this.id = uuid.v4();
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

module.exports = Shift;