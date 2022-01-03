import {signOut, useSession} from 'next-auth/react'
import {useEffect,useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/outline'
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import {useRecoilValue, useRecoilState} from 'recoil';
import { spotifyApi } from '../lib/spotify';
import Songs from './Songs';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];

function Center() {
    const session = useSession();
    const [color,setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(()=>{
        setColor(shuffle(colors)[0]);
    },[playlistId])

    useEffect(()=>{
       spotifyApi.getPlaylist(playlistId) 
            .then(data => setPlaylist(data.body))
            .catch(err => console.log('err', err))
    },[spotifyApi, playlistId])

    return (
        <div className='text-white flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <div 
                className='flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full bg-black p-1 pr-3 absolute top-5 right-8'
                onClick = {signOut} 
            >
                <img 
                    className='rounded-full w-10 h-10'
                    alt = 'profile-pic'
                    src = {session?.data?.user?.image}
                />
                <p>{session?.data?.user.name}</p>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>

            <div className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`} >
                <img
                    className='h-44 w-44 shadow-2xl'
                    alt='playlist-profile'
                    src={playlist?.images?.[0]?.url}
                />
                <div>
                    <p>PLAYLIST</p>    
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
                        {playlist?.name}
                    </h1>
                </div> 
            </div>

            <Songs/>
        </div>
    )
}

export default Center
