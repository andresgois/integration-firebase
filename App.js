import React, { Component } from 'react';
import {  Button, FlatList, StyleSheet,  Text,  TouchableOpacity,  View} from 'react-native';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, remove, update, push, child, onValue } from "firebase/database";
import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from '@env';

class App extends Component {

  
  constructor(props){
    super(props)
    const firebaseConfig = {
      apiKey: APIKEY,
      authDomain: AUTHDOMAIN,
      databaseURL: DATABASEURL,
      projectId: PROJECTID,
      storageBucket: STORAGEBUCKET,
      messagingSenderId: MESSAGINGSENDERID,
      appId: APPID,
      measurementId: MEASUREMENTID
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase();
    this.state = { users: [] }
  }

  cadastrarUser(){
    console.log("aqui")
    const email = "andre.s.gois3@gmail";
    const password = "5101621apb*";
    const auth = getAuth();
    console.log(auth);

    // não funciona
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  
  componentWillMount(){ 
    const starCountRef = ref(getDatabase(), 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data)
      //console.log(typeof data)
      this.setState({ users: data})      
      //console.log(this.state.users)
      //updateStarCount(postElement, data);
    });
  }

  saveData(){
    console.log('Save data')
    this.writeUserData("001", "André", "andre@email.com", 18)
    this.writeUserData("002", "Priscila", "pri@email.com", 22)
    this.writeUserData("003", "Luiza", "luiza@email.com", 25)
    // var database = app.database();
    // database.ref("pontuacao").set("100")
    /*const database = getDatabase();
    set(ref(database, 'Pontuacao/'), {
      pontos: 600
    })*/
    //remove(ref(database, 'Pontuacao/'))
    //update(ref("pontuacao"), '1589' )

    // const newPostKey = push(child(ref(database), 'Pontuacao')).key;
    // const updates = {};
    // updates['pontos'] = 1569;
    // update(ref(database, 'Pontuacao'), updates)
    // console.log(updates);    
  }

  writeUserData(userId, name, email, age) {    
    set(ref(getDatabase(), 'users/'+ userId), {
      id: userId,
      username: name,
      email: email,
      age : age
    });
  }

  handleClick(v){
    console.log(v)
  }

  handleDelete(v){
    console.log(v.id)
    const p = remove(ref(getDatabase(), 'users/'+v.id))
    console.log(p)
    //remove(ref(getDatabase(), 'users/'))
  }
  
  
  render(){
    let { users } = this.state;
    users !== null ? users = Object.values(users): null;
    //console.log(users)
 
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => {this.saveData()} }
          style={styles.btn}
        >
          <Text style={styles.text}>Salvar dados</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '800'}}>Usuários</Text>
        <Button           
          onPress={ () => this.cadastrarUser() }
          title='Cadastrar User'
        />
        
        <View>
          { users !== null ?
            users.map( (user) => (
              <View key={user.email} style={{ flexDirection: 'row'}}>
                <Text style={{ padding: 2, margin: 5}}>{user.username}</Text> 
                <Text style={{ padding: 2, margin: 5}}>{user.email}</Text> 
                <Text style={{ padding: 2, margin: 5}}>{user.age}</Text>
                <Button onPress={ () => this.handleClick(user)} title='Editar' />
                <Button onPress={ () => this.handleDelete(user)} title='Deletar' />
              </View>
            ))
            : <Text>Sem Informações</Text>
          }
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
  },
  btn: {
    padding: 9,
    backgroundColor: '#0000ff',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  }
});

export default App;
