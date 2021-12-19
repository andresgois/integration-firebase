import React, { Component } from 'react';
import {  StyleSheet,  Text,  TouchableOpacity,  View} from 'react-native';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, remove, update, push, child } from "firebase/database";
import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from '@env';

class App extends Component {

  //UNSAFE_componentWillMount(){
    componentDidMount(){
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
  }

  saveData(){
    console.log('Save data')
    // var database = app.database();
    // database.ref("pontuacao").set("100")
    const database = getDatabase();
    set(ref(database, 'Pontuacao/'), {
      pontos: 200
    })
    //remove(ref(database, 'Pontuacao/'))
    //update(ref("pontuacao"), '1589' )

    // const newPostKey = push(child(ref(database), 'Pontuacao')).key;
    // const updates = {};
    // updates['pontos'] = 1569;
    // update(ref(database, 'Pontuacao'), updates)
    // console.log(updates);
  }
  
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => {this.saveData()} }
          style={styles.btn}
        >
          <Text style={styles.text}>Salvar dados</Text>
        </TouchableOpacity>
        <Text>My App</Text>
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
