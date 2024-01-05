import React from 'react'
import './pageNotFound.css'
import Page404svg from './Page404svg'
import { Link } from 'react-router-dom'

export default function PageNotFound() {

   return (
      <main>
         <div className="container not-found-container my-5">
            <div className="row">
               <div className="col-md-6 align-self-center">
                  <Page404svg />
               </div>
               <div className="col-md-6 align-self-center not-found-content">
                  <h1>404</h1>
                  <h2>UH OH! You're lost.</h2>
                  <p>
                     The page you are looking for does not exist. How you got here is a
                     mystery. But you can click the button below to go back to the
                     homepage.
                     </p>

                  <Link to="/" style={{ outline: 'none' }} className=" btn btn-home btn-home-green">HOME</Link>
               </div>
            </div>
         </div>
      </main>
   )
}
