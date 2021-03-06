import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';
/**
* @customElement
* @polymer
*/
class UserLogin extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    display: block;
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  
  #form{
    border: 1px solid red;
    border-radius:20px;
    background-color:white;
    width:40%;
  padding:20px;
    margin: 70px auto;  
  }
  h2{
    text-align: center;
    
  }
  paper-button {
    text-align: center;
    margin-top: 40px;
    background-color:black;
    color:white;
    margin-bottom: 40px;
    margin-left: 180px;
  }  
</style>
<app-location route={{route}}></app-location>

<iron-form id="form">
  <form>
    <h2> Doctor Login </h2>
    <paper-input label="Phone Number" id="phone" allowed-pattern=[0-9] type="text" value={{phone}} name="phone"  maxlength="10" required error-message="enter phone number" ></paper-input>
    <paper-input label="Password" id="pass" type="password" value={{password}} name="password" required error-message="enter user name" ></paper-input>
    <paper-button raised id="login" on-click="signIn">Login</paper-button>
  </form>
</iron-form>
<paper-toast text="Please Enter All Details"  class="fit-bottom" id="blankForm"></paper-toast>
<paper-toast text="Wrong Credentials"  class="fit-bottom" id="wrongCredentials"></paper-toast>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
  }
  static get properties() {
    return {
      users: Object,
      details: {
        type: Object
      },
      baseUrl: String
    };
  }
  // fetching the  user data from josn file 
  signIn() {

    if (this.$.form.validate()) {
      let phone = this.phone;
      let password = this.password;
      this.details = { mobile: phone, password: password }
      this.$.form.reset();
      this._makeAjax(`${baseUrl1}/housepital/doctors`, 'post', this.details);

    } else {

    }
  }

  // handling error if encounter error from backend server
  _handleError() {

  }

  // getting response from server and storing user name and id in session storage
  _handleResponse(event) {
    this.users = event.detail.response
    this.dispatchEvent(new CustomEvent('refresh-login', { detail: { login: true }, bubbles: true, composed: true }))
    sessionStorage.setItem('doctorName', this.users.doctorName);
    sessionStorage.setItem('doctorId', this.users.doctorId);
    sessionStorage.setItem('login', true);
    this.set('route.path', './dashboard-page')
  }
  // calling main ajax call method 
  _makeAjax(url, method, postObj) {
    let ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }

}

window.customElements.define('login-page', UserLogin);