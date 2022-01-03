import { playlistState } from "../atoms/playlistAtom"
import {useRecoilValue} from 'recoil';
import Song from './Song';
import {ClockIcon} from '@heroicons/react/outline'
function Songs() {
    const playlist = useRecoilValue(playlistState)
    return (
        <div className="text-gray-500 px-8 flex-col space-y-1 pb-28 text-base">
            <div className="flex items-center justify-between px-5  border-b border-gray-800 pb-3">
                <div className="space-x-2">
                   <span>#</span> 
                   <span>TITLE</span>
                </div>

                <p className="pl-3 hidden md:inline">ALBUM</p>
                <ClockIcon className='w-5 h-5 '/> 
                
            </div>
            {playlist?.tracks?.items?.map((track, index)=>
                <Song key = {track.track.id} index = {index} track = {track}/>
            )}            
        </div>
    )
}

export default Songs
