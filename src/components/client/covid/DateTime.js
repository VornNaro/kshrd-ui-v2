import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default class DateTime extends Component {
   state = {
      startDate: new Date()
   };

   //TODO: This function is created to get date from input
   handleChange = date => {
      this.setState({
         startDate: date
      });
   };

   render() {
      return (
         <DatePicker
            selected={this.state.startDate}
            isClearable
            onChange={this.handleChange}
         />
      );
   }
}
