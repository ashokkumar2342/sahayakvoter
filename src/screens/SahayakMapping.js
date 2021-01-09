
import React, { Component } from 'react';
import { View, Text , Button, ScrollView, TextInput,TouchableOpacity,StyleSheet,Linking,Alert,Picker,AsyncStorage} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
var db = openDatabase({ name: 'VoterDatabase.db' }); 

export class SahayakMapping extends Component {
    
	constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' }; 
    this.state = { 
      loading: true, 
      sahshayaks:[],  
      id:props.route.params.id,  
      mobile_no:props.route.params.mobileno,  
         
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
     const {mobile_no='',parivaar_name=''}=this.state 
      try{
          if (mobile_no !='' && parivaar_name !='') {
            db.transaction(function(txn) {   
                txn.executeSql('INSERT INTO sahshayaks (parivaar_name,mobileno) VALUES (?,?)',[parivaar_name, mobile_no],
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

	 showSahayak = async ()=>{
     const {mobile_no='',parivaar_name=''}=this.state  
     var temps = []; 
      try{
          if (mobile_no !='' || parivaar_name !='') {
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
                        console.log('No record found');
                    } 
                  }
                );  
            });  
            setTimeout(() => { 
                 this.setState({ 
                sahshayaks: temps
                })  
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
            <View>
            <Button style={{alignItems:'right'}}
            onPress ={() => this.props.navigation.push('SahayakCreateMapping')}
            title="Create Sahayak"
            color="green"
            accessibilityLabel="Create Sahayak"
            />
            </View>
            
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
             <Text style={styles.buttonText}  onPress={() => this.showSahayak()}>Show Sahayak</Text>
           </TouchableOpacity>
           <ScrollView>
           { 
            this.state.sahshayaks.map((itemValue,index) => { 
               return <View style={styles.rows}> 
               <View style={{height:50,width:150,
                backgroundColor: 'white',
                textAlign:'center', 
                paddingHorizontal:16,}}>
               <Text>{itemValue.name_e}</Text>
               </View>
               <View style={{height:50,width:120,
                backgroundColor: 'white',
                textAlign:'center', 
                paddingHorizontal:16,}}>
               <Text>{itemValue.mobileno}</Text>
               </View>
               <View style={{height:50,width:60,
                backgroundColor: 'white',
                textAlign:'center',  
                paddingHorizontal:16,}}>
                <Text>
                <TouchableOpacity>
                    <Icon name="link" size={20} color="#32a89e"  onPress={() => this.props.navigation.navigate('SahayakMappingDetails',{id:itemValue.id,parivaar_name:itemValue.parivaar_name,mobileno:itemValue.mobileno})} />   
                   </TouchableOpacity> 
                </Text>
               </View>

                   
                
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
  rowdesign : { 
    height:50,
    backgroundColor: 'white',
     textAlign:'center', 
    marginVertical: 10,
    paddingHorizontal:16,
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
  },
  rows: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width:'100%',
   
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    textAlign:'center',
    height:50,
    marginVertical: 10
  },
  col: {
    width: '50%' // is 50% of container width
  }
});

export default SahayakMapping