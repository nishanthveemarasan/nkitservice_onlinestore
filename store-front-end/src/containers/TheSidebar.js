import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {responsiveStoreAction} from "../store/store";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) =>{
    return{
      sidebarShow: state.responsiveStore.sidebarShow
    }
  }
  
  const show = useSelector(mapStateToProps);
 // alert(show.sidebarShow);
   return (
    <CSidebar
      show={show.sidebarShow}
      onShowChange={(val) => dispatch(responsiveStoreAction.changeState({sidebarShow: val }))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        cartDNA
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
