import React from 'react';
import Header from './app-header/Header';
import NavigationPanel from './app-header/NavigationPanel';

class App extends React.Component {
  
  render() {
    return (
      <div>
          <div className="app-header">
              <Header applicationName="Dashboard Application"/>
          </div>
          <div>
              <NavigationPanel/>
          </div>
      </div>
    );
  }
}

export default App