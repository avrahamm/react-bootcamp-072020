import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect, useRef} from 'react';
import YouTubePlayer from 'youtube-player';
import './main.css'

function YoutubePlayer(props) {
    const [videoId, setVideoId] = useState('-B8Q7Nv0yDQ'); // 'RJ1SuQVopjE'
    const [isPlaying, setIsPlaying] = useState(false);
    const playerDivRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(function () {
        playerRef.current = YouTubePlayer(playerDivRef.current);
    }, []);

    useEffect(function () {
        const player = playerRef.current;
        player.loadVideoById(videoId);
    }, [videoId]);

    useEffect(function () {
        const player = playerRef.current;
        if ( isPlaying) {
            player.playVideo();
        }
        else {
            player.stopVideo();
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
                <button onClick={() => setIsPlaying(false)}>Stop</button>
            </div>
        </div>
    );
}


const App = () => {

    return (
        <div>
            <h1>Hello World</h1>
            <YoutubePlayer/>
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
