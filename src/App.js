import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import './App.css';


//Okay, let's try to understand this code: 
//We have a class called App that extends Component from React.
class App extends Component {
  //Class constructor - setting the initial state of the selectedTab to 'home'.
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  //Methods:
  //The renderShippingRequests method returns the Board component.
  renderShippingRequests() {
    return (<Board />);
  }

  //The renderNavigation method returns the Navigation component in order to render the navigation bar and pass the onClick.
  renderNavigation() {
    return (<Navigation
      onClick={(tabName) => this.changeTab(tabName)}
      selectedTab={this.state.selectedTab}
      />);
  }

  //The renderTabContent method returns the HomeTab component if the selectedTab is 'home' or the renderShippingRequests method if the selectedTab is 'shipping-requests'.
  renderTabContent() {
    //Switch statement to determine which tab to render.
    switch(this.state.selectedTab) {
      case 'home':
      default:
        return HomeTab(); //Invokes the HomeTab component.
      case 'shipping-requests':
        return this.renderShippingRequests(); //Invokes the renderShippingRequests method.
    }
  }

  //The render method returns the App component.
  render() {
    return (
      //The App component has a div with the class name "App".
      <div className="App">
        {/* Navigation Tab Rendering. */}
        {this.renderNavigation()}
        <div className="App-body">
          {/* Tab Content upon selection */}
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  //The changeTab method changes the selectedTab state.
  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;