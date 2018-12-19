<template>
  <div class="chat">
    <br>
   <div class="chatWrap">
      <b-row>
        <b-col sm="6">
          <b-form>
            <b-form-group>
              <b-form-input type="email" v-model="email" placeholder="Email"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
            </b-form-group>
            <div class="buttonContainer">
              <b-button class="formButton" v-on:click="register()"> Register </b-button>
              <b-button class="formButton" v-on:click="login()"> Login</b-button>
              <b-button class="formButton" v-on:click="logout()"> Logout </b-button>
            </div>
          </b-form>
          <hr>
          <b-form inline>
            <b-form-input id="chatInput" type="text" v-model="msg"></b-form-input>
            <b-button id="sendButton" v-on:click="writeNewPost()">Send</b-button>
          </b-form>
            <hr>
        </b-col>
        <b-col sm="6">
          <div id="scrollme" class="chatContainer">
            <div v-for="(msg, index) in messages" :key="index">
              <p class="small">{{msg.name}}</p>
              <p class="small">{{msg.email}}</p>
              <p class="small">{{msg.date}}</p>
              <p>{{msg.body}}</p>
              <hr id="divider">
            </div>
          </div>
        </b-col>  
      </b-row>
      

   </div>
   
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
.chatWrap {
  width: 100%;
  padding: 0px 15px 10px 15px;
}
.buttonContainer {
  display: flex;
}
.formButton {
   margin-right: 5px;
   background-color: rgb(46, 46, 128); 
}
#sendButton {
  margin: 0px 0px 0px 5px;
  background-color: rgb(130, 130, 130); 
}
#chatInput {
  width: 73%;
}
.chatContainer {
  /* scroll-snap-type: y mandatory; */
  overflow-y: scroll;
  height: 280px;
}
#divider {
  width: 50%;
  height: 5px;
}
</style>

