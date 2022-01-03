import { currentTrackIdState, isPlayState } from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import useSongInfo from '../hooks/useSongInfo';
import {
    HearIcon,
    VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
    SwitchHorizontalIcon,
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    VolumeUpIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession;
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();


    function fetchCurrentSong() {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then(data => {
                    console.log('current', data);
                    setCurrentTrackId(data.body?.item?.id);

                    //track the currentplayingstate
                    spotifyApi.getMyCurrentPlaybackState()
                        .then(data => {
                            console.log('isplaying', data)
                            setIsPlaying(data.body?.is_playing);
                        })
                })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session]);

    // this function will not change when other states change
    const debounceAdjustVolume = useCallback(
        debounce(volume => spotifyApi.setVolume(volume).catch(err => console.log(err)), 500)
        , [])

    useEffect(() => {
        debounceAdjustVolume(volume);
    }, [volume]);

    function handlePause() {
        spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                if (data.body.is_playing) {
                    spotifyApi.pause();
                    setIsPlaying(false);
                } else {
                    spotifyApi.play();
                    setIsPlaying(true);
                }
            })
    }

    return (
        <div className="text-white bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 py-6">
            <div className='flex space-x-4 items-center'>
                <img
                    alt='playing-pic'
                    src={songInfo?.album.images?.[0]?.url}
                    className='hidden md:inline w-10 h-10'
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button' />
                <RewindIcon
                    className='button'
                    onClick={() => spotifyApi.skipToPrevious()}
                />
                {isPlaying ? <PauseIcon className='button w-10 h-10' onClick={handlePause} /> : <PlayIcon className='button w-10 h-10' onClick={handlePause} />}
                <FastForwardIcon 
                    className='button' 
                    onClick={() => spotifyApi.skipToNext()}
                />
                <ReplyIcon className='button' />
            </div>

            <div className='flex items-center justify-end space-x-3 md:space-x-4 pr-5'>
                <VolumeDownIcon
                    onClick={() => setVolume(volume - 10)}
                    className='button'
                />
                <input
                    onChange={(e) => setVolume(Number(e.target.value))}
                    value={volume}
                    type='range'
                    name='volume'
                    min={0}
                    max={100}
                    className='w-14 md:w-28'
                />
                <VolumeUpIcon
                    onClick={() => setVolume(volume + 10)}
                    className='button'
                />
            </div>
        </div>
    )
}

export default Player
