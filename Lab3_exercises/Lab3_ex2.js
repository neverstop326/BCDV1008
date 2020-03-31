
const moment = require('moment');

const getCurrentDate = () => {
    var wrapped = moment(new Date());
    var cd = moment(wrapped).format("dddd, MMMM Do YYYY");
    var ct = moment(wrapped).format("h:mm:ss a");

    console.log(` ${cd} : ${ct} `);
};

getCurrentDate();