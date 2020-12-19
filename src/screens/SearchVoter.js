
import React, { Component } from 'react';
import { View, Text ,ScrollView, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import Button from 'react-native-material-ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
var db = openDatabase({ name: 'VoterDatabase.db' });

export class SearchVoter extends Component {
    
	constructor(props) {
	    super(props);
	    this.state = { text: 'Useless Placeholder' }; 
		this.state = { 
        loading: true, 
        userdetails:[],  
         
	}; 
  }
  
  componentDidMount(){     
     
  }
  
	static navigationOptions={
		header :null
	}
	 
	 showDetails = async ()=>{
     const {name='',father_name=''}=this.state  
     var temps = []; 
      try{
          if (name !='' || father_name !='') {
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
                        alert('No record found');
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
     
    } 
    dialCall = (p_mobilenumber) => {
 
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+p_mobilenumber+'}';
        }
        else {
          phoneNumber = 'telprompt:${'+p_mobilenumber+'}';
        }
     
        Linking.openURL(phoneNumber);
         
      };

      sendSMS = (p_mobilenumber) => {
        Linking.openURL("sms:&addresses="+p_mobilenumber+"&body=My sms text");
      };

    sendWhatsapp = (p_mobilenumber) => {
 
    let msg = 'type something';
    let phoneWithCountryCode = '91'+p_mobilenumber;

    let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure WhatsApp installed on your device');
        });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
      };
	 
  render() {
    return (
      <View style={styles.container}>
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
               onChangeText={text=> this.setState({father_name:text})}
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
                <Icon name="whatsapp" size={30} color="#900" onPress={this.sendWhatsapp(itemValue.mobileno)} style={{ marginLeft: 30 }}  /> 
                   --
                <Icon name="phone" size={30} color="#900" onPress={this.dialCall(itemValue.mobileno)} style={{ marginLeft: 30 }}  /> 
                --<Icon name="sms" size={30} color="#900" onPress={this.sendSMS(itemValue.mobileno)} style={{ marginLeft: 30 }}  />
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
    height:75,
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

export default SearchVoter