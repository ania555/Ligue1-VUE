<template>
  <div class="chat">
    <br>
   <b-container>
      <b-form>
        <b-form-group>
          <b-form-input type="email" v-model="email" placeholder="Email"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
        </b-form-group>
        <b-button v-on:click="register()"> Register </b-button>
        <b-button v-on:click="login()"> Login</b-button>
        <b-button v-on:click="logout()"> Logout </b-button>
      </b-form>
      <hr>
      <b-form inline>
        <b-form-input id="chatInput" type="text" v-model="msg"></b-form-input>
        <b-button v-on:click="writeNewPost()">Send</b-button>
      </b-form>
        <hr>

      <div id="scrollme" class="chatContainer">
        <div v-for="(msg, index) in messages" :key="index">
          <p class="small">{{msg.name}}</p>
          <p class="small">{{msg.email}}</p>
          <p class="small">{{msg.date}}</p>
          <p>{{msg.body}}</p>
          <hr id="divider">
        </div>
      </div>


   </b-container>
   
  </div>
</template>


<script>
// @ is an alias to /src

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


export default {
  name: 'chat',
  components: {
    
  },
  data() {
    return {
      msg: "",
      user: null,
      messages: [],
      email: "",
      password: "",
      message: "",
    }
  },
  updated() {
  this.scroll();
  },
  methods: {
    register() {
      console.log("in register");
      if (this.email === '' || this.password === '') {
        alert('Please provide the email and password');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        this.message = 'Successfully created user';
        var user = firebase.auth().currentUser;
        this.user = user;
        this.email = "";
        this.password = "";
        console.log(user);
      })
      .catch(function(error) {
        alert("error" + error.message); 
      });
    },
    login() {
      console.log("in signIn");

      if (this.email === '' || this.password === '') {
        alert('Please provide the email and password');
        return;
      }
      
      // var provider = new firebase.auth.GoogleAuthProvider();

      /* firebase.auth().signInWithPopup(provider)
      .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // let user = firebase.auth().currentUser;
          this.user = user;
          console.log(user);
          console.log(user.displayName);
          console.log(user.email);
        }) */

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          this.user = firebase.auth().currentUser;
        })
        .catch(function(error) {
          alert("error" + error.message);
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(function() {
          console.log("Sign-out successful");
        })
        .catch(function(error) {
          // An error happened.
          alert("Logout failed");
        });
    },
    writeNewPost() {
      console.log(this.user.displayName);
      console.log(this.msg);

      const post = {
        name: this.user.displayName,
        email: this.user.email,
        body: this.msg,
        date: new Date().toLocaleString("en-US")
      };
      const newPostKey = firebase.database().ref().child("mainChat").push().key;
      const updates = {};
      updates[newPostKey] = post;
      firebase.database().ref("mainChat").update(updates);
      this.msg = null;
      this.getPosts();
    },
    getPosts() {
      firebase.database().ref("mainChat")
        .on("value", data => {
          this.messages = data.val()});
    },
    scroll() {
      document.getElementById('scrollme').scrollTop = document.getElementById('scrollme').scrollHeight;
    },
  },
}
</script>



<style scoped>
.chat {
  background-color: rgb(245, 250, 220);
}
button {
  margin: 10px;
}
#chatInput {
  width: 73%;
}
.chatContainer {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 300px;
}
.chatContainer div {
  
  -ms-scroll-snap-points-y: 
  
}
#divider {
  width: 50%;
  height: 5px;
}
</style>

