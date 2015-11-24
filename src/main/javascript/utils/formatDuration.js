'use strict';

export default function(millis) {
    if (millis > 0) {
        var seconds = Math.floor(millis / 1000);
        var minutes = Math.floor(seconds / 60);
        var minstr;
        var secstr;

        seconds = seconds % 60;

        if (minutes === 0) {
            minstr = '';
        } else {
            minstr = minutes + ' min ';
        }

        secstr = '' + seconds + ' sec';

        return minstr + secstr;
    }
    return '0 sec';
}
