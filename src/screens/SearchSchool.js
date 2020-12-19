
import React, { Component } from 'react';
import { View, Text , Button, TextInput,TouchableOpacity,StyleSheet,Alert,AsyncStorage} from 'react-native';

export class SearchSchool extends Component {
	constructor(props) {
	   super(props);
	   this.state = { text: 'Useless Placeholder' };
		state = { school_code: null }
		this.state = { 
			dataSource:[],      
		   }; 
	}
	static navigationOptions={
		header :null
	}
	 
    checkSchoolCode = async ()=>{       
         const {school_code}=this.state   
         //this.props.navigation.navigate('Login');       
		 fetch('http://eageskool.com/api/search-school?school_code='+school_code+'')
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
				loading: false,
				dataSource: responseJson
                })    
				if(responseJson.status==1){ 
          LoginData(responseJson.id,responseJson.school_url); 
				}else{ 
					Alert.alert('Error','School Code Not Match',[{
					text:'Okey'
				   }])
				}
				
			})  
		LoginData = async (data,root_url)=>{ console.log(root_url)
		await	 AsyncStorage.setItem('rootUrl', String(root_url))	 
        this.props.navigation.navigate('Login'); 
		 }
	 }
	 
  render() {
    return (
      <View style={styles.container}>
           <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="School Code"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
             
              onChangeText={text=> this.setState({school_code:text})}
              />          
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}  onPress={() => this.checkSchoolCode()}>Go To Login</Text>
             
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
  },
  buttonTextRight: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'right'
  }
});

export default SearchSchool