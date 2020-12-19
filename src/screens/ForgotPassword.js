
import React, { Component } from 'react';
import { View, Text , Button, TextInput,TouchableOpacity,StyleSheet,Alert,AsyncStorage} from 'react-native';

export class ForgotPassword extends Component {
	constructor(props) {
	   super(props);
	   this.state = { text: 'Useless Placeholder' };
		state = { username: '' }
		this.state = { 
			dataSource:[],      
		   }; 
	}
	static navigationOptions={
		header :null
	}
	 
	 sendOtp = async ()=>{ 
     const {username}=this.state 
		 fetch('http://mailin.co.in/api/forgot-password?email='+username+'')
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
				loading: false,
				dataSource: responseJson
				})   
				if(responseJson.status==1){
        this.props.navigation.navigate('OtpScreen',{email:username}); 
          
				}else{
					Alert.alert('Error','Email/Mobile mismatch',[{
					text:'Okey'
				   }])
				}
				
			}) 
	 	
 
	  
		LoginData = async (data)=>{
		// alert(String(data))
		await	 AsyncStorage.setItem('isLoggedIn', String(data))
		await	AsyncStorage.setItem('userId', String(data))
	 		this.props.navigation.navigate('DashboardScreen');
	 
		
		 }
	 }
	 
  render() {
    return (
      <View style={styles.container}>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email/Mobile"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              onChangeText={text=> this.setState({username:text})}
              /> 
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.sendOtp()}>Send OTP</Text>
           </TouchableOpacity>     
           <TouchableOpacity  >
           <Text  style={styles.buttonText}   onPress={() => this.props.navigation.navigate('Login')}>Go To Login</Text>
           </TouchableOpacity>  
  		</View>

    )
  }
}

const styles = StyleSheet.create({
  container : {
  	backgroundColor:'#455a64',
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'

  },


  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

  
});

export default ForgotPassword