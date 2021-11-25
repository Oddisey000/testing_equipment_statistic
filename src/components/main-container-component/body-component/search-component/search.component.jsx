import React from 'react';
import { connect } from "react-redux";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ToggleButton from '@mui/material/ToggleButton';
import SearchIcon from '@mui/icons-material/Search';

import "./search.component.scss";

import DataTableComponent from "../datatable-component/datatable.component";

import { getDataFromDB } from "../../../../redux/app-reducer/app-reducer.actions";

const SearchComponent = ({ appReducer, getDataFromDB }) => {
  console.log(appReducer)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    PrepareDataForTable()
    setTimeout(() => {
      setState({ ...state, [anchor]: open });
    }, 100);
  };

  const PrepareDataForTable = () => {
    const orderInfo = document.getElementById("combo-box-demo").value;
    const equipmentInfo = document.getElementById("equipment-simple-select").innerText;

    if (orderInfo) {
      if (orderInfo && equipmentInfo.length > 2) {
        getDataFromDB(`${appReducer.API_url}requestdata?order=${orderInfo}&equipment=${equipmentInfo}`)
      } else {
        getDataFromDB(`${appReducer.API_url}requestdata?order=${orderInfo}&equipment=''`)
      }
    }
  }

  const list = (anchor) => (
    <div>
      <DataTableComponent {...appReducer} />
    </div>
  );

  return (
    <div id="search_icon_button">
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <ToggleButton
            value="Пошук"
            onClick={toggleDrawer(anchor, true)}
            //onFocus={PrepareDataForTable}
          >
            <SearchIcon />
          </ToggleButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataFromDB: (request) => dispatch(getDataFromDB(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
