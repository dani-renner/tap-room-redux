import { connect } from 'react-redux';
import React from 'react';
import NewKegForm from './NewKegForm';
import KegList from './KegList';
import KegDetail from './KegDetail';
import EditKegForm from './EditKegForm';
import PropTypes from "prop-types";
import * as a from "./../actions";

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      formVisibleOnPage: false,
      selectedKeg: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null){
      this.setState({
        selectedKeg: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.props.masterKegList[id];
    this.setState({selectedKeg: selectedKeg});
  }

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const action = a.addKeg(newKeg);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleDecrease = (id) => {
    const { dispatch } = this.props;
    const keg = this.props.masterKegList[id];
    parseInt(keg.pints);
    if (keg.pints > 1){
    keg.pints -= 1;
    } else {
      keg.pints = "empty";
    }
    // const objArray = Object.entries(masterKegList);
    // const newArray = objArray.filter(([key, value]) => value.id !== id);
    // const editedMasterKegList =  keg => keg.id !== this.state.selectedKeg.id);
    // this.setState({
    //   masterKegList: editedMasterKegList,
    // });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingKegInList = (kegToEdit) => {
    const { dispatch } = this.props;
    const { name, brewer, price, abv, pints, id } = kegToEdit;
    const action = {
      type: 'ADD_KEG',
      id: id,
      name: name,
      brewer: brewer,
      price: price,
      abv: abv,
      pints: pints
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedKeg: null
    });
  }
  
  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditKegForm keg = {this.state.selectedKeg} onEditKeg = {this.handleEditingKegInList} />
      buttonText = "Return to Keg List";
    } else if (this.state.selectedKeg != null){
    currentlyVisibleState = <KegDetail onDecrease = {this.handleDecrease } onClickingEdit = {this.handleEditClick} keg = {this.state.selectedKeg}  />;
    buttonText = "Return to Keg List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm onNewKegCreation={this.handleAddingNewKegToList} />;
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = <KegList kegList={this.props.masterKegList} onKegSelection={this.handleChangingSelectedKeg} />;
      buttonText = "Add Keg";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    masterKegList: state.masterKegList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;