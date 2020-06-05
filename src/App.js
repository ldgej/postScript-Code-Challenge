import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Artist from './containers/Artist';
import { Provider } from "react-redux";
import store from './createStore';


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
         <BrowserRouter> 
          <div className='AppContainer'>
             <Route path='/' exact component={Artist}></Route> 
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
