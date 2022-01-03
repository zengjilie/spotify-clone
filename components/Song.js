import { currentTrackIdState, isPlayState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import millisToMinutesAndSeconds from '../lib/time';
import {useRecoilState} from 'recoil';

//use song comp to change the currenttrackid and isplaying
function Song({track, index}) {
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const[isPlaying, setIsPlaying] = useRecoilState(isPlayState);
    const spotifyApi = useSpotify();

    function play (){
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris:[track.track.uri]
        })
    }
    return (
        <div 
            className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer" 
            onClick = {play}
        >
            <div className="flex items-center space-x-4">
                <p>{index + 1}</p>
                <img
                    className="w-10 h-10"
                    alt="album-pic"
                    src={track.track.album.images[0].url}
                />
                <div >
                    <p className='text-white w-36 lg:w-64 truncate '>{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className = 'flex ml-auto md:ml-0 items-center justify-between'>
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
