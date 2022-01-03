import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
} from "@heroicons/react/outline";
import{
    HeartIcon
} from '@heroicons/react/solid'
import { useSession, signOut} from "next-auth/react";
import useSpotify from "../hooks/useSpotify"; 
import {useState, useEffect} from 'react';
import {playlistIdState} from '../atoms/playlistAtom';
import { useRecoilState } from "recoil";

function Sidebar() {
    const spotifyApi = useSpotify();
    const session = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists()
                .then((data)=>{
                    setPlaylists(data.body.items);
                }).catch(err => console.log(err))
        }
    }, [session,spotifyApi])

    return (
        <div className="pb-36 text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[14rem] border-r border-gray-800 overflow-y-scroll scrollbar-hide h-screen hidden md:inline-flex">
            <div className="space-y-4">
                <img
                    alt="spotify-logo" 
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                    className="py-3 h-16 object-contain"
                />
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <span>Home</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <span>Library</span>
                </button>

                <hr className="border-t-[0.1px] border-gray-800" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>Create Playlist</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500" />
                    <span>Liked Songs</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <span>Your Episodes</span>
                </button>
                <hr className="border-t-[0.1px] border-gray-800" />

                {playlists.map(item=>
                    <p 
                        className="cursor-pointer flex items-center space-x-2 hover:text-white" 
                        key ={item.id}
                        onClick = {()=>setPlaylistId(item.id)}
                    >
                        {item.name}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
