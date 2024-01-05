import React, { useEffect } from 'react'
import './NoContent.css'

export default function NoContent() {

   return (
      <div style={{ marginBottom: '30vh' }} className="d-flex justify-content-center align-items-center">
         <div className="loading">
            <h1 className="no-content-h1">500</h1>
            <h2 className="no-content-h2">Unexpected Error <b>:(</b></h2>
            <div class="gears">
               <div class="gear one">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
               </div>
               <div class="gear two">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
               </div>
               <div class="gear three">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
               </div>
            </div>
         </div>
      </div>
   )
}
