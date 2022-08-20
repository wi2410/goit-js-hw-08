import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

    
const onPlay = function({seconds}) {
    // data is an object containing properties specific to that event
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seconds));
};

const getTimeFromStorage = localStorage.getItem(STORAGE_KEY);

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(JSON.parse(getTimeFromStorage));