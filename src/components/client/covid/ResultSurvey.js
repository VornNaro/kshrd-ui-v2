import React from 'react'

export default function ResultSurvey(props) {

   const { image, content } = props.data
   const totalScore = props.totalScore

   return (
      <div className="row">
         <div class="col-5">
            <div class="modal-image">
               <img className="w-100" src={image} alt="covid" />
            </div>
         </div>

         <div class="col-7">
            <h5 className="text-center py-2">Result</h5>
            <div className="text-center">
               <span className="text-danger font-weight-bold">You got {totalScore}/14</span>
               <div className="py-3 px-2">
                  <p>{content}</p>
               </div>

            </div>
         </div>
      </div>
   )
}
