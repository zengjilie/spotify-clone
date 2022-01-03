import { currentTrackIdState} from '../atoms/songAtom';
import { useState, useEffect } from 'react';
import {useRecoilState} from 'recoil';
import useSpotify from './useSpotify';
import { set } from 'lodash';

//hold song info, when select a song
function useSongInfo() {
    const spotifyApi = useSpotify(); 
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const[songInfo, setSongInfo] = useState(null);

    useEffect(()=>{
        if(currentTrackId){
            spotifyApi.getTracks([currentTrackId])
                .then(data => {
                    setSongInfo(data.body.tracks[0]);
                }).catch(err => console.log('err',err))
        }
    },[currentTrackId,spotifyApi])

    return songInfo; 
}

export default useSongInfo
