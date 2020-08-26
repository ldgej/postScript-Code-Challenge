import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PostScript from './containers/PostScript';
import Detail from './components/Detail';
import  NewCampaign  from './components/NewCampaign';
import { Provider } from "react-redux";
import store from './createStore';


class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className='AppContainer'>
              <Route path='/' exact component={PostScript}></Route>
              <Route path='/new' exact component={NewCampaign}></Route>
              <Route path='/detail/:id' component={Detail}></Route>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}
export default App;
