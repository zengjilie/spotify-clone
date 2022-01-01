import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    
} from "@heroicons/react/outline";
import { useSession, signOut} from "next-auth/react";
import useSpotify from "../hooks/useSpotify"; 
import {useState, useEffect} from 'react';
import {playlistIdState} from '../atoms/playlistAtom';

function Sidebar() {
    const spotifyApi = useSpotify();
    const session = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState(playlistIdState);

    console.log('session',session);
    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists()
                .then((data)=>{
                    console.log('data',data.body);
                    setPlaylists(data.body.items);
                }).catch(err => console.log(err))
        }
    }, [session,spotifyApi])

    console.log(playlists);
    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
            <div className="space-y-4">
                <button 
                    className="flex items-center space-x-2 hover:text-white"
                    onClick = {()=>signOut()}
                >
                    <span>Logout</span>
                </button>
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

                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>Create Playlist</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <span>Liked Songs</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <span>Your Episodes</span>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {playlists.map(item=>
                    <p 
                        className="flex items-center space-x-2 hover:text-white" 
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
