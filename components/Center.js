import {useSession} from 'next-auth/react'
import {useEffect,useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/outline'
import { shuffle } from 'lodash';
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

    useEffect(()=>{
        setColor(shuffle(colors)[0]);
    },[])
    return (
        <div className='text-white flex-grow'>
            <div className='flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full bg-black p-1 pr-3 absolute top-5 right-8'>
                <img 
                    className='rounded-full w-10 h-10'
                    alt = 'profile-pic'
                    src = {session?.data?.user?.image}
                />
                <span>{session?.data?.user.name}</span>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>

            <div className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`} >

            </div>
        </div>
    )
}

export default Center
