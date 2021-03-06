import React from 'react';
import { Link, withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  fontFamily: 'Orbitron'
};

const style2 = {
  fontFamily: 'Orbitron',
  color: 'white'
};

const backgroundStyle = {
  backgroundSize: 'cover',
  position: 'fixed',
  flex: 1,
  height: '100%',
  width: '100%',
};

export default props => (

  <div className="signin">

    <img
      style={backgroundStyle}
      src={'http://i.imgur.com/1ZEHnrH.jpg'}
    />

    {/* Preload (but don't display) the browser cache with UI images so that the follow-up VR scene loads faster */}
    <img alt="lobby-_1" src="http://i.imgur.com/A6fO7Bf.jpg" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="exit" src="http://i.imgur.com/5x56Jce.png" style={{display: 'none'}} crossOrigin="anonymous"/>

    <img alt="home" src="http://i.imgur.com/PMgJxSU.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="like" src="http://i.imgur.com/Iz5kgoH.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="liked" src="http://i.imgur.com/XTLYqU3.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="mic" src="http://i.imgur.com/wNqlh3b.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="micActivated" src="http://i.imgur.com/p433Gsv.png" style={{display: 'none'}} crossOrigin="anonymous"/>

    <img alt="input" src="http://i.imgur.com/sELlxqj.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="input activated" src="http://i.imgur.com/Sls7xlQ.png" style={{display: 'none'}} crossOrigin="anonymous"/>
    <img alt="info" src="http://i.imgur.com/BGRK0Vf.png" style={{display: 'none'}} crossOrigin="anonymous"/>


    <div>
      <h1 className="centerText" style={{color: 'white', top: '15px', position: 'absolute', width: '100%', textAlign: 'center', fontSize: '100px'}}> ImmerseVR</h1>

      <div className="centerButtons" style={{top: '100px', position: 'absolute', left: '25.5%'}}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          style={{color: 'white !important'}}
          onChange={event => props.onEmailChange(event)}
        />
        </MuiThemeProvider>
        <br />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          style={{color: 'white !important'}}
          onChange={event => props.onPasswordChange(event)}
        />
        </MuiThemeProvider>
        <br />
        <br/>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RaisedButton buttonStyle={style} label="Sign In" primary={true} onClick={props.submitFn} />
        </MuiThemeProvider>

        <br/>
        <br/>

        <div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <RaisedButton buttonStyle={style} label="Login As Guest" primary={true} onClick={() => props.toggleGuestLogin(props.submitFn)} />
            </MuiThemeProvider>
        </div>

        <br/>

        <div>
            <Link to="/signup" className="fancyText" style={{color: 'white'}}> Create an Account </Link>
        </div>

      </div>
    </div>

    {/*}
    <label htmlFor="email"> Email </label>
    <input type="text" id="email" name="email" onChange={event => props.onEmailChange(event)} />
    <label htmlFor="password"> Password </label>
    <input type="password" id="password" name="password" onChange={event => props.onPasswordChange(event)} />
    <input type="button" id="signin" value="Signin" onClick={props.submitFn} />
    Don't have an account?

    */}

  </div>
);
