import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {responsiveStoreAction} from "../store/store";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
   const mapStateToProps = (state) =>{
    return{
      sidebarShow: state.responsiveStore.sidebarShow
    }
  }
  
  const show = useSelector(mapStateToProps);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(show.sidebarShow) ? false : 'responsive'
   dispatch(responsiveStoreAction.changeState({sidebarShow: val }));
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(show.sidebarShow) ? true : 'responsive'
    dispatch(responsiveStoreAction.changeState({sidebarShow: val }));
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        
      </CHeaderNav>

      <CHeaderNav className="px-3">
       
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
           
           
         
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
