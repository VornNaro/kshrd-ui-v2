import React from 'react'
import { Card } from 'react-bootstrap'

export default function CareerPathContent({ data, props }) {
   const subContents = props.map((subContent, index) => {
      if (subContent.parent_id === data.id) {
         return (
            <div key={index} className="col-md-4 col-lg-4">
               <Card className="w-100 border-0 rounded-0 h-100 career">
                  <div style={{ height: '200px', width: '100%' }}>
                     <Card.Img
                        style={{ objectFit: 'cover' }}
                        className="w-100 h-100 img-fluid rounded-0"
                        src={subContent.photo || " https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png"}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png" }}
                     ></Card.Img>
                  </div>
                  <Card.Body className="career-path-body">
                     <div className="career-path-card-title">
                        <h5 className="font-weight-bold mt-2 more-career-path">
                           {subContent.description}
                        </h5>
                        <p className="text-muted sub-content-detail">{subContent.detail}</p>
                     </div>

                  </Card.Body>
               </Card>
            </div >
         )
      }
   })
   return (

      <div style={{ width: "87%", margin: '0 auto' }} className="py-5">

         <div className="career-path-image-top">
            <img
               className="w-100"
               src={data.photo || "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png"}
               alt="career path"
               onError={(e) => { e.target.onerror = null; e.target.src = "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png" }} />
         </div>
         <div className="career-path-description">
            <div className="career-path-desc-title py-4">
               <span className="pr-4" style={{ fontSize: '1.2em', fontWeight: '600' }}>DESCIPTION</span>
               <div className="career-path-line"></div>
            </div>
            <p>
               {data.description}
            </p>
         </div>
         <div className="career-path-description">
            <div className="career-path-desc-title py-4">
               <span className="pr-4" style={{ fontSize: '1.2em', fontWeight: '600' }}>DETAIL</span>
               <div className="career-path-line"></div>
            </div>
            <div className="career-path-detail-list">
               {data.detail}
            </div>
         </div>

         <div className="row mt-5">

            {subContents}

         </div>
      </div>
   )
}
