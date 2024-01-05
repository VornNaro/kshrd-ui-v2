import { getPartnerType, getPartnersById, getMorePartnersAction, getPartnerCallBackAction } from "../../../Actions/client/partnerActions/partnerActionType"

const defaulState = {
   partnerTypes: [],
   partnerTypesLoading: true,
   partners: [],
   partnerLoading: true,
   partnerCbLoading: true,
}

export const clientPartnerReducer = (state = defaulState, action) => {
   switch (action.type) {

      // get partner type
      case getPartnerType.request:
         return {
            ...state,
            partnerTypes: action.data,
            partnerTypesLoading: action.loading
         }

      case getPartnerType.success:
         return {
            ...state,
            partnerTypes: action.data,
            partnerTypesLoading: action.loading
         }

      case getPartnerType.failure:
         return {
            ...state,
            partnerTypes: action.data,
            partnerTypesLoading: action.loading
         }
      // get partner type


      //get partner info by partner type id

      case getPartnersById.request:
         return {
            ...state,
            partners: action.data,
            partnerLoading: action.loading
         }

      case getPartnersById.success:
         return {
            ...state,
            partners: action.data,
            partnerLoading: action.loading
         }

      case getPartnersById.failure:
         return {
            ...state,
            partners: action.data,
            partnerLoading: action.loading
         }

      //get partner info by partner type id


      //get more partner info 

      case getMorePartnersAction.success:
         return {
            ...state,
            partners: [...state.partners, ...action.data],
            partnerLoading: action.loading
         }

      //get partner callback
      case getPartnerCallBackAction.request:
         return {
            ...state,
            partnerCbLoading: action.loading
         }

      case getPartnerCallBackAction.success:
         return {
            ...state,
            partners: action.data,
            partnerCbLoading: action.loading
         }

      case getPartnerCallBackAction.failure:
         return {
            ...state,
            partners: action.data,
            partnerCbLoading: action.loading
         }
      default:
         return state
   }
}