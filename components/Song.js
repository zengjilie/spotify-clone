import millisToMinutesAndSeconds from '../lib/time';
function Song({track, index}) {
    return (
        <div className="grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer" >
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
