
import React, { Component } from 'react';
import { View, Text ,ScrollView, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import Button from 'react-native-material-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
var db = openDatabase({ name: 'VoterDatabase.db' });
createFromLocation: '~data/my-existing-data.db'

export class NumberUpdate extends Component {
    
	constructor(props) {
	    super(props);
	    this.state = { text: 'Useless Placeholder' }; 
		this.state = { 
        loading: true, 
        userdetails:[],  
        id:props.route.params.id,  
        mobile_no:props.route.params.mobileno,  
         
	}; 
  }
  
  componentDidMount(){    
    // const {mobile_no='',id}=this.state 
    // db.transaction(function(txn) {  
    //     console.log(mobile_no)
    //     txn.executeSql(
    //       "UPDATE voters  set mobileno =? WHERE id =?",
    //       [5777777491,id],
    //       function(txt,res){  
    //         if(results.rowsAffected>0){
    //             alert('Updated successfully');
                 
    //           }else{
    //             alert('Updation Failed');
    //           }   
              
    //       }
    //     );  
    // }); 
  }
   
	 
	 numberUpdate = async ()=>{
     const {mobile_no='',id}=this.state 
      try{
          if (mobile_no !='') {
            db.transaction(function(txn) {  
                console.log(mobile_no)
                txn.executeSql(
                  "UPDATE voters  set mobileno =? WHERE id =?",
                  [mobile_no,id],
                  function(txt,res){  
                    if(res.rowsAffected>0){
                        alert('Updated successfully'); 
                         
                      }else{
                        alert('Updation Failed');
                      }   
                      
                  }
                );  
            });  
          }else{
              alert('Enter Mobile No')
          } 
           
      }catch(err){
          
      }   
     
    };
    
	 
  render() {
    return (
      <View style={styles.container}>
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Mobile No"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff" 
              value = {this.state.mobile_no}
              onChangeText={text=> this.setState({mobile_no:text})}
            />
             
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.numberUpdate()}>Update</Text>
           </TouchableOpacity>  
           
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
    height:100,
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

export default NumberUpdate