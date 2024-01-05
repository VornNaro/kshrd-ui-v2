import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllPartnersById } from '../../../redux/Actions/client/partnerActions/partnerAction'

class AboutOurPartnerCard extends React.PureComponent {
   render() {
      let partners = this.props.data.map((partner, index) => {
         return (
            <div
               key={index}
               className="col-lg-3 col-md-3 col-sm-4 col-6"
               style={{ marginBottom: "30px" }}
            >
               <div className="card text-center border-0 rounded-0 h-100 partner-card d-flex justify-content-around position-relative">
                  <img
                     className="w-100 py-2 mr-auto px-lg-5 px-md-3 px-sm-3 px-3"
                     src={partner.logo}
                     alt="partner"
                  />

                  <div className="partner-title">
                     <p>{partner.name + this.props.id}</p>
                  </div>

                  <div className="partner-address position-absolute">
                     <h5>{partner.name}</h5>
                     <p className="m-0">{partner.address}</p>
                  </div>
               </div>
            </div>
         );
      })

      return (
         <div className="list-partner mt-4">
            <div className="row">{partners}</div>
         </div>
      );

   }

}


const mapStateToProps = state => {
   return {
      partners: state.clientPartnerReducer.partners
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
      getAllPartnersById,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutOurPartnerCard);