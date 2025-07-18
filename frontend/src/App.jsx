import React from 'react'
import AppRoutes from './routes'
import Header from './component/header'
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className='bg-white ' style={{height:"fit-content"}}>
    <Header/>
          <div class="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8 ">
           <AppRoutes/>
                 <Toaster position="top-right" reverseOrder={false} />

</div>
     
    </div>
  )
}
