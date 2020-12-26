
import React, { Component } from 'react';
import { View, Text ,ScrollView, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import Button from 'react-native-material-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
var db = openDatabase({ name: 'VoterDatabase.db' }); 

export class FamilyMapping extends Component {
    
	constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' }; 
    this.state = { 
      loading: true, 
      parivaars:[],  
      id:props.route.params.id,  
      mobile_no:props.route.params.mobileno,  
         
	}; 
  }
  
  componentDidMount(){    
    db.transaction(function(txn) {   
      txn.executeSql(
        'SELECT * FROM parivaars',
                      [],
        function(txt,res){  
          console.log(res.item(0)) 
            
        }
      );  
  });
 
  }
   
	 
	 createFamily = async ()=>{
     const {mobile_no='',parivaar_name=''}=this.state 
      try{
          if (mobile_no !='' && parivaar_name !='') {
            console.log(mobile_no,parivaar_name)
            db.transaction(function(txn) {   
                txn.executeSql('INSERT INTO parivaars (parivaar_name,mobileno) VALUES (?,?)',[parivaar_name, mobile_no],
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
     const {mobile_no='',parivaar_name=''}=this.state  
     var temps = []; 
      try{
          if (mobile_no !='' || parivaar_name !='') {
            db.transaction(function(txn) {  
                txn.executeSql(
                  "SELECT * FROM parivaars",
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
                parivaars: temps
                }) 
                console.log(this.state.parivaars[1])
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
              placeholder="Enter Parivaar Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff" 
              value = {this.state.parivaar_name}
              onChangeText={text=> this.setState({parivaar_name:text})}
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
             <Text style={styles.buttonText}  onPress={() => this.createFamily()}>Create Parivaar</Text>
           </TouchableOpacity>  
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.showFamily()}>Show Parivaar</Text>
           </TouchableOpacity>
           <ScrollView>
           { 
            this.state.parivaars.map((itemValue,index) => { 
               return <View style={styles.textBox}>
                <Text>{itemValue.parivaar_name}</Text>
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

export default FamilyMapping