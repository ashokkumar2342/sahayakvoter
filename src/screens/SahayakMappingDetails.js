
import React, { Component } from 'react';
import { View, Text ,ScrollView,Switch, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import Button from 'react-native-material-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import SmsRetriever from 'react-native-sms-retriever';
import DeviceInfo from 'react-native-device-info';
var db = openDatabase({ name: 'VoterDatabase.db' });

export class SahayakMappingDetails extends Component {
    
	constructor(props) {
	    super(props);
	    this.state = { text: 'Useless Placeholder' }; 
		this.state = { 
        loading: true, 
        userdetails:[],  
        sahshayaks:[],  
        id:props.route.params.id,
        mobileno:props.route.params.mobileno,  
	}; 
  }
  
  componentDidMount(){ 
    this.sahshayakshow();
  } 
    sahshayakshow =async () => {
        var temps = []; 
        let {id}=this.state 
     try{
        
        db.transaction(function(txn) {  
            txn.executeSql(
                "SELECT * FROM voters  WHERE sah_sahayak_id =?",
                [id],
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
                    console.log('No record found');
                } 
                }
            );  
        });  
        setTimeout(() => { 
        console.log(temps)
            this.setState({ 
            sahshayaks: temps
            })  
        }, 100);
         
          
     }catch(err){
         
     } 
    }
    onPhoneNumberPressed = async () => {
    try { 
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      
      console.log(phoneNumber);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
   };
	 showDetails = async ()=>{
     const {name='',father_name='',serial_number=''}=this.state  
     var temps = []; 
      try{
          if (name !='' || father_name !='' || serial_number !='') {
            db.transaction(function(txn) {  
                txn.executeSql(
                  "SELECT * FROM voters",
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
                        console.log('No record found');
                    } 
                  }
                );  
            });  
            setTimeout(() => { 
                 this.setState({ 
                userdetails: temps
                }) 
                console.log(this.state.userdetails[1])
            }, 100); 
          }else{
              alert('Enter Details')
          } 
           
      }catch(err){
          
      }   
     
    };
   
    isMapped = async (voterid,sah_sahayak_id)=>{ 
        let {id}=this.state   
        if(sah_sahayak_id !=0){
            id =0;
        }  
        db.transaction(function(txn) {   
            txn.executeSql(
              "UPDATE voters  set sah_sahayak_id =? WHERE id =?",
              [id,voterid],
              function(txt,res){   
                if(res.rowsAffected>0){
                    // alert('Updated successfully');
                  }else{
                    alert('Updation Failed');
                  }   
                  
              }
            );  
        });
        setTimeout(() => {
            this.showDetails();  
            this.sahshayakshow();  
        }, 100);
    };

  render() { 
    return (
        
      <View style={styles.container}> 
            <View style={styles.textBox}>
                {
                    this.state.sahshayaks.map((itemValue,index) => {
                        return <Text>{index+1}. {itemValue.name_e}</Text>
                        })
                } 
            </View>             
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff" 
              onChangeText={text=> this.setState({name:text})}
            />
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Father's Name" 
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
               onChangeText={text=> this.setState({father_name:text})}
              />
            <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Enter Serial Number" 
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
               onChangeText={text=> this.setState({serial_number:text})}
              />     
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.showDetails()}>Show Details</Text>
           </TouchableOpacity>  
           <ScrollView>
           { 
            this.state.userdetails.map((itemValue,index) => { 
               return <View style={styles.textBox}>
                <Text>{itemValue.name_e}</Text>
                <Text>{itemValue.father_name}</Text>
                <Text>{itemValue.mobileno}</Text>
                <Text>  
                   <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={1 ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.isMapped(itemValue.id,itemValue.sah_sahayak_id)}
                    value={itemValue.sah_sahayak_id !=0 ?true:false}
                    /> 
                </Text>
                

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

export default SahayakMappingDetails