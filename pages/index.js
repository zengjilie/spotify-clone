import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="">
      <main className='bg-black h-screen'>
        <Sidebar/>  
      </main> 
    </div>
  )
}
