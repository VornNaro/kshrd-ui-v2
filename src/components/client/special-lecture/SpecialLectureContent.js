import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getSpecialLectureByGenId } from '../../../redux/Actions/client/specialLectureActions/specialLectureAction'
import ContentSkeleton from './ContentSkeleton';
function SpecialLectureContent(props) {

   useEffect(() => {
      props.getSpecialLectureByGenId(props.id)
   }, [])

   const content = props.specialLecture.length !== 0 ? props.specialLecture.map(item => {

      const name = item.generation.name

      return item.eventDescription.map((uItem, index) => {
         return (
            <div key={index} className="cus-container" data-aos="fade-up">
               <div className="special-content">
                  <div className="row mb-4">
                     <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="img-box-bg" style={{ maxHeight: '300px' }}>
                           <img className="w-100 h-100" src={uItem.image} alt="special" />
                        </div>
                     </div>
                     <div className="col-lg-8 col-md-7 col-sm-6">
                        <div className="s-title">
                           <h4>{name}</h4>
                           <p>{uItem.description}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )
      });
   }) : <h3 className="text-center">No Data</h3>

   return (
      <>
         {props.loading ? <ContentSkeleton /> : content}

      </>
   )
}

const mapStateToProps = state => {
   return {
      specialLecture: state.clientSpecialLectureReducer.specialLecture,
      loading: state.clientSpecialLectureReducer.specialLecLoading
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
      getSpecialLectureByGenId,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLectureContent)