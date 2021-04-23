import React from 'react';
import KegDetail from './KegDetail';
import KegList from './KegList';
import NewKegForm from './NewKegForm';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      formVisibleOnPage: false,
      masterKegList: [],
      selectedKeg: null,
    };
  }

  handleClick = () => {
    if (this.state.selectedKeg != null){
      this.setState({
        formVisibleOnPage: false,
        selectedKeg: null
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleChangingSelectedKeg = (id) => {
    const selectedKeg = this.state.masterKegList.filter(keg => keg.id === id)[0];
    this.setState({selectedKeg: selectedKeg});
  }

  handleAddingNewKegToList = (newKeg) => {
    const newMasterKegList = this.state.masterKegList.concat(newKeg);
    this.setState({masterKegList: newMasterKegList,
    formVisibleOnPage: false });
  }

  handleDecrease = () => {
    const keg = this.state.masterKegList.filter(keg => keg.id === this.state.selectedKeg.id)[0];
    parseInt(keg.pints);
    if (keg.pints > 1){
    keg.pints -= 1;
    } else {
      keg.pints = "empty";
    }
    const editedMasterKegList = this.state.masterKegList
    .filter(keg => keg.id !== this.state.selectedKeg.id)
    .concat(keg);
    this.setState({
      masterKegList: editedMasterKegList,
    });
  }
  
  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.selectedKeg != null){
    currentlyVisibleState = <KegDetail onDecrease = {this.handleDecrease } keg = {this.state.selectedKeg}  />
    buttonText = "Return to Keg List";
    }else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm onNewKegCreation={this.handleAddingNewKegToList} />
      buttonText = "Return to Keg List";
    } else {
      currentlyVisibleState = <KegList kegList={this.state.masterKegList} onKegSelection={this.handleChangingSelectedKeg} />
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
export default KegControl;