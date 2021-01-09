
import React, { Component } from 'react';
import { View, Text , Button, ScrollView, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
var db = openDatabase({ name: 'VoterDatabase.db' }); 

export class SahayakCreateMapping extends Component {
    
	constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' }; 
    this.state = { 
      loading: true, 
      sahshayaks:[],  
	}; 
  }
  
  componentDidMount(){    
    db.transaction(function(txn) {   
      txn.executeSql(
        'SELECT * FROM sahshayaks',
                      [],
        function(txt,res){  
          console.log(res.item(0)) 
            
        }
      );  
  });
 
  }
   
	 
	 createFamily = async ()=>{
     const {mobile_no='',sahayak_name=''}=this.state 
      try{
          if (mobile_no !='' && sahayak_name !='') {
            db.transaction(function(txn) {   
                txn.executeSql('INSERT INTO sahshayaks (name_e,mobileno) VALUES (?,?)',[sahayak_name, mobile_no],
                  function(txt,res){  
                    if(res.rowsAffected>0){
                        alert('Create Successfully'); 
                         
                      }else{
                        alert('Create Failed');
                      }   
                      
                  }
                );  
            });  
          }else{
              alert('Enter Details')
          } 
           
      }catch(err){
          
      }   
     
    };

	 showFamily = async ()=>{
     const {mobile_no='',sahayak_name=''}=this.state  
     var temps = []; 
      try{
          if (mobile_no !='' || sahayak_name !='') {
            db.transaction(function(txn) {  
                txn.executeSql(
                  "SELECT * FROM sahshayaks",
                  [],
                  function(txt,res){  
                      console.log('query Completed')
                    var len = res.rows.length;
                    var temp = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            temp.push(res.rows.item(i)); 
                        } 
                        temps =temp;   
                    }else{
                        alert('No record found');
                    } 
                  }
                );  
            });  
            setTimeout(() => { 
                 this.setState({ 
                sahshayaks: temps
                }) 
                console.log(this.state.sahshayaks[1])
            }, 100);
           
            
          }else{
              alert('Enter Details')
          } 
           
      }catch(err){
          
      }  
     
    };
    
	 
  render() {
    return (
      <View style={styles.container}> 
             
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Sahayak Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff" 
              value = {this.state.sahayak_name}
              onChangeText={text=> this.setState({sahayak_name:text})}
            />
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Mobile No"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff" 
              keyboardType="numeric"
              value = {this.state.mobile_no}
              onChangeText={text=> this.setState({mobile_no:text})}
            /> 
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.createFamily()}>Create Sahayak</Text>
           </TouchableOpacity>  
           <ScrollView>
           { 
            this.state.sahshayaks.map((itemValue,index) => { 
               return <View style={styles.textBox}>
                <Text>{itemValue.sahayak_name}</Text>
                <Text>{itemValue.mobileno}</Text> 
                </View>
                
            })
            
            }  
            </ScrollView>
  		</View> 
          

    )
  }
}

const styles = StyleSheet.create({
  container : {
  	backgroundColor:'#455a64',
    flexGrow: 1,
    
    alignItems: 'center'
  },
  inputBox: {
    width:350,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  textBox: { 
    width:350,
    height:50,
    backgroundColor:'white',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:350,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  }, 
  dialbutton: {
    width:30,
    backgroundColor:'#E5E4E2',
    color:'#ffffff',
    borderRadius: 5,
 
    paddingVertical: 5
  }, 
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonTextRight: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'right'
  }
});

export default SahayakCreateMapping