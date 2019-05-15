/* 
    fegit parsing logic
*/
var parseTime = function (timing) {
    if (timing.length === 6) {
        // st1120
        timing = timing.slice(0, 2) + " " + timing.slice(2, 4) + ":" + timing.slice(4,);
    } else if (timing.length === 5) {
        if (timing[1] >= 0 || timing[1] <= 9) {
            // s/t/m/w/r/a + 1120
            timing = timing[0] + " " + timing.slice(1, 3) + ":" + timing.slice(3,);
        } else {
            // st940
            timing = timing.slice(0, 2) + " " + "0" + timing.slice(2, 3) + ":" + timing.slice(3, );
        }        
    } else if (timing.length === 4) {
        // s940
        timing = timing[0] + " " + "0" + timing[1] + ":" + timing.slice(2,);
    }
    timing = timing.toUpperCase();
    
    return timing;
}

module.exports = {
    parseTime
};  