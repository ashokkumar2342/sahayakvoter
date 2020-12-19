
import React, { Component } from 'react';
import { View, Text , Button, TextInput,TouchableOpacity,StyleSheet,Alert,AsyncStorage} from 'react-native';

export class OtpScreen extends Component {
	constructor(props) {
	   super(props);
	   this.state = { text: 'Useless Placeholder' };
		state = { otp: '' }
		this.state = { 
            dataSource:[],  
            username:this.props.navigation.state.params.email,  
		   }; 
	}
	static navigationOptions={
		header :null
	}
	 
	 sendOtp = async ()=>{ 
     const {otp}=this.state
     
		 fetch('http://mailin.co.in/api/forgot-password/otp-verify?email='+this.state.username+'&otp='+otp+'')
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
				loading: false,
				dataSource: responseJson
				})   
				if(responseJson.status==1){
                    Alert.alert('Password Reset','Successfully',[{
                        text:'Okey'
                       }])
                   this.props.navigation.navigate('Login'); 
          
				}else{
					Alert.alert('Error','Username/password mismatch',[{
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
         
           <Text  style={styles.buttonText}>Sent Otp Verify  {this.state.username}</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="OTP"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="number"
              onChangeText={text=> this.setState({otp:text})}
              /> 
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.sendOtp()}>Submit</Text>
           </TouchableOpacity>     
           <TouchableOpacity  >
           <Text  style={styles.buttonText}   onPress={() => this.props.navigation.navigate('ForgotPassword')}>Go Forgot Password</Text>
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

export default OtpScreen