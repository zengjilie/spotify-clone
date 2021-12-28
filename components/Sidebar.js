import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon} from '@heroicons/react/outline'
function Sidebar() {
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
            <div>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className = 'h-5 w-5'/>
                    <span>Home</span>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className = 'h-5 w-5'/>
                    <span>Search</span>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className = 'h-5 w-5'/>
                    <span>Library</span>
                </button>

            </div>
            <div>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className = 'h-5 w-5'/>
                    <span>Create Playlist</span>
                </button>    
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className = 'h-5 w-5'/>
                    <span>Create Playlist</span>
                </button>    
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className = 'h-5 w-5'/>
                    <span>Create Playlist</span>
                </button>    
            </div> 
        </div>
    )
}

export default Sidebar

