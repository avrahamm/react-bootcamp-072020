import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect, useRef} from 'react';
import Player from '@vimeo/player';

/**
 * Done according to lesson 26 YoutubePlayer example
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function VimeoPlayer(props) {
    const [videoId, setVideoId] = useState('76979871'); // '19231868'
    const [isPlaying, setIsPlaying] = useState(false);
    const playerDivRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(function () {
        playerRef.current = new Player(playerDivRef.current, {
            id: videoId,
            width: 640
        });
    }, []);

    useEffect(function () {
        const player = playerRef.current;
        player.loadVideo(videoId).then(function(id) {
            console.log("the video successfully loaded");
        })
    }, [videoId]);

    useEffect(function () {
        const player = playerRef.current;
        if ( isPlaying) {
            player.play();
        }
        else {
            player.pause();
        }
    }, [isPlaying]);


    return (
        <div>
            <div>
                <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)}/>
            </div>
            <div className='player-div' ref={playerDivRef}/>
            <div>
                <button onClick={() => setIsPlaying(true)}>Start</button>
                <button onClick={() => setIsPlaying(false)}>Pause</button>
            </div>
        </div>
    );
}


const App = () => {

    return (
        <div>
            <h1>Hello World</h1>
            <VimeoPlayer/>
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
