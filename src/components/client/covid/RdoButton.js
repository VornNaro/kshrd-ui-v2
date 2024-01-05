import React, { Component } from 'react'

export default class RdoButton extends Component {

   state = {
      opYesTrue: false,
      opNoTrue: false,
   }

   //TODO: This function is created to get true selection from input
   setOpYesTrue = () => {
      this.setState({
         opYesTrue: true,
         opNoTrue: false
      })
   }

   //TODO: This function is created to get false selection from input
   setOpNoTrue = () => {
      this.setState({
         opYesTrue: false,
         opNoTrue: true
      })
   }

   //TODO: This function is created to get answer from input
   onChange = (event, id) => {
      const aw = event.target.value
      this.props.setAnswer(aw, id);
   }


   render() {

      return (
         <div className="my-4">
            <div className="rdo-title my-3">
               <h6 className="font-weight-bold">
                  {this.props.data.name}
                  {this.props.data.validate === true && <h6 className="text-danger d-inline m-0"> * Required</h6>}
               </h6>

            </div>
            <div className="d-flex justify-content-between box-wrapper my-2" >
               <div className={this.state.opYesTrue ? 'box-radio box-radio-active' : 'box-radio'}>

                  <label className="label-radio p-2" htmlFor={`yes-${this.props.data.id}`}>Yes
                     <input
                        type="radio"
                        value={this.props.data.value}
                        name={this.props.data.name}
                        id={`yes-${this.props.data.id}`}
                        data-select={this.props.data.selected}
                        onChange={(props) => {
                           this.onChange(props, this.props.data.id)
                           this.setOpYesTrue()
                        }
                        } />
                  </label>

               </div>
               <div className={this.state.opNoTrue ? 'box-radio box-radio-active' : 'box-radio'}>
                  <label className="label-radio p-2" htmlFor={`no-${this.props.data.id + 1}`}>No
                  <input
                        type="radio"
                        value="0"
                        name={this.props.data.name}
                        id={`no-${this.props.data.id + 1}`}
                        data-select={this.props.data.selected}
                        onChange={(props) => {
                           this.onChange(props, this.props.data.id)
                           this.setOpNoTrue()
                        }} />
                  </label>

               </div>
            </div>
         </div>
      )
   }
}
