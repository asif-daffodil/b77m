/**
 * Config Settings
 *
 * @returns {array}
 */
function config() {

    var $config = [];
    $config.loadingBars = '.countdown-bar';

    // Countdown Loading Bar
    $config.loadingBars_width = 800;
    $config.loadingBars_height = 40;
    $config.loadingBars_border_color = '#77807d';
    $config.loadingBars_color =  '#77807d';
    $config.loadingBars_background_color =  '#e0e0e0c9';

    // Countdown Timer
    $config.timer_color = '#000';
    $config.timer_font_weight = 700;
    $config.timer_font = 'Poppins';
    $config.timer_font_size = 16;
    $config.endtime_message = 'Timer expired!';

    return $config;
}


/**
 * Set countdown element
 *
 * Element should be build as
 * <div class="countdownbar" id="elementID">
 * <div></div>
 * <div></div>
 * </div>
 *
 * Then call the function countdown('elementID', 0, 0, 0, 10)
 *
 * @param {string} $element
 * @param {number} $daysAdd
 * @param {number} $hoursAdd
 * @param {number} $minutesAdd
 * @param {number} $secondsAdd
 */
function countdown($element, $daysAdd, $hoursAdd, $minutesAdd, $secondsAdd) {

    $config = this.config();

    $($config.loadingBars).css('width', $config.loadingBars_width);
    $($config.loadingBars).css('height', $config.loadingBars_height);
    $($config.loadingBars).css('background-color', $config.loadingBars_background_color);
    $($config.loadingBars).css('border-color', $config.loadingBars_border_color);

    $dateNow = new Date();
    $hour = $dateNow.getHours();
    $minute = $dateNow.getMinutes();
    $second = $dateNow.getSeconds();
    $now_loader = new Date().getTime();

    var interval = setInterval(function() {

        $loadingBars_loader = $('#' + $element).children('div')[0];
        $loadingBars_timer = $('#' + $element).children('div')[1];

        $countDownDate = $dateNow.setDate($dateNow.getDate() + $daysAdd);
        $countDownDate = $dateNow.setHours($hour + $hoursAdd);
        $countDownDate = $dateNow.setMinutes($minute + $minutesAdd);
        $countDownDate = $dateNow.setSeconds($second + $secondsAdd + 1);

        $now = new Date().getTime();
        $distance = $countDownDate - $now;

        $distance_loader = $countDownDate - $now_loader;
        $distance_loadingBar_part =  (($config.loadingBars_width / ($distance_loader - 1000)) * 1000);
        $distance_loadingBar_part = Math.floor($distance_loadingBar_part * 10000) / 10000;

        $secondsPast = parseInt(($distance_loader - $distance) / 1000);

        $newDistance  = $distance_loadingBar_part * $secondsPast;
        if($newDistance > $config.loadingBars_width) $newDistance = $config.loadingBars_width;

        $($loadingBars_loader).animate({ width: $newDistance + 'px' }, 500);

        // TIMER
        $timerHtmlStart = '<span style="color: ' + $config.timer_color + '; font-weight: ' + $config.timer_font_weight + '; font-family: ' + $config.timer_font + '; font-size: ' + $config.timer_font_size + 'px;">';
        $timerHtmlEnd = '</span>';


        // set loading bar background-color as set in config
        $($loadingBars_loader).css('background-color', $config.loadingBars_color);
        $($loadingBars_timer).css('width', $config.loadingBars_width);
        $($loadingBars_timer).css('height', $config.loadingBars_height);

        // SET LOADING-BAR
        if($newDistance == $config.loadingBars_width) {
                $($loadingBars_timer).html($timerHtmlStart + $config.endtime_message + $timerHtmlEnd);

                clearInterval(interval);
                return;
        } else {

            $timeLeftFinal = setTimer($distance);

            $($loadingBars_timer).html($timerHtmlStart + $timeLeftFinal + $timerHtmlEnd);

        }
    }, 1000);
}




/**
 * Set the timer compared to what date it is and what time is set for it.
 *
 * @param {timstamp} $distance
 */
function setTimer($distance) {
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor($distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(($distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor(($distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor(($distance % (1000 * 60)) / 1000);

    if(hours < 10) {
        hours = "0" + hours;
    }

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    var timeLeft = hours + ":" + minutes + ":" + seconds;

    if(days !== 0) {

        if(days === 1) {
            var timeLeftFinal = days + " day + " + timeLeft;
        } else {
            var timeLeftFinal = days + " days + " + timeLeft;
        }

    } else {
        var timeLeftFinal = timeLeft;
    }

    return timeLeftFinal;
}

