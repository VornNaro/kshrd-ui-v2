import Axios from "axios";
import { baseUrl } from "../../../../config/API";
import { getPartnerType, getPartnersById, getMorePartnersAction, getPartnerCallBackAction } from "./partnerActionType";

//TODO: This function is created to get all partner types
export const getAllPartnerTypes = () => {
   return async (dispatch) => {
      try {
         dispatch({
            type: getPartnerType.request,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/partner-types`);
         dispatch({
            type: getPartnerType.success,
            data: result.data.data,
            loading: false
         })

      } catch (err) {

         dispatch({
            type: getPartnerType.failure,
            data: [],
            loading: true
         })
      }
   }
}

export const getAllPartnersById = (id) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: getPartnersById.request,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/partners?limit=12&page=1&partnerTypeId=${id}`)

         dispatch({
            type: getPartnersById.success,
            data: result.data.data,
            loading: false
         })

      } catch (err) {
         dispatch({
            type: getPartnersById.failure,
            data: [],
            loading: true
         })
      }
   }
}


export const getMorePartners = (page, id, callBack) => {
   return async (dispatch) => {

      try {
         dispatch({
            type: getMorePartnersAction.request,
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/partners?limit=1000&page=${page}&partnerTypeId=${id}`)

         dispatch({
            type: getMorePartnersAction.success,
            data: result.data.data,
            loading: false
         })
         callBack(result.data.data)

      } catch (err) {
         dispatch({
            type: getMorePartnersAction.failure,
            loading: true
         })
      }


   }
}

//TODO: This function is created to get more partner types
export const getPartnerCallBack = (id, callBack) => {
   return async (dispatch) => {
      try {
         dispatch({
            type: getPartnerCallBackAction.request,
            data: [],
            loading: true
         })

         const result = await Axios.get(`${baseUrl}/partners?limit=1000&page=1&partnerTypeId=${id}`)

         dispatch({
            type: getPartnerCallBackAction.success,
            data: result.data.data,
            loading: false
         })
         callBack(result.data.data)

      } catch (err) {
         dispatch({
            type: getPartnerCallBackAction.failure,
            data: [],
            loading: true
         })
      }


   }
}