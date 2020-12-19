import React, { Component } from 'react';
import Moment from 'react-moment';
import {TextInput,Picker,Text, View ,Button,StyleSheet,Image,TouchableOpacity,AsyncStorage,ScrollView,FlatList,ActivityIndicator, Alert, } from 'react-native';
import { createBottomTabNavigator, createAppContainer,createDrawerNavigator,createStackNavigator,StackNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Toolbar} from 'react-native-material-ui';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { black } from 'ansi-colors';
import DatePicker from 'react-native-datepicker';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Modal from 'react-native-modal';
export const ROOT_URL = 'http://eageskool.com';
import { WebView } from 'react-native-webview';
class StudentProfile extends React.Component { 
  static navigationOptions = {

    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (
      <Icon name="user" size={20} color="#000" />
    ),
  };
  _getUserId = async() => {
    const userId =await AsyncStorage.getItem('userId');
    
    return userId;
  }
  constructor(props) {
    
    super(props);
    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],
      classes:[],
      sectionTypes:[],
      
     };
     
   }
     componentDidMount(){
      AsyncStorage.getItem('userId').then((value) => 
       this.setState({ 'userId': value })       
       )
       AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/admin/details/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson, 
          
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
       }); 
      }  
   
      _signOutAsync = async () => {
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          key: null,  
          actions: [this.props.navigation.navigate('profile')]
        })
        // this.props.navigation.dispatch(actionToDispatch)
        await AsyncStorage.removeItem('isLoggedIn');    
         
        this.props.navigation.navigate('profile');
      }; 

    render() {
      if (this.state.isLoading) {
        return <View><Text>Loading...</Text></View>;
      }
      return (
        <ScrollView>
        <View style={styles.container}>
             <View style={styles.header}>
            <View style={styles.headerContent}>                 
            <Image style={styles.avatar}
                  source={{uri: ROOT_URL+'/api/admin/image/'+this.state.userId}}/>
                <Text style={styles.name}>
                {this.state.dataSource.first_name} {this.state.dataSource.last_name}
                </Text>
                <Button title="sign out" onPress={this._signOutAsync} />    
            </View>
          </View>
           
           <View style={styles.list}>
            <Text style={styles.name}>
                  Email : {this.state.dataSource.email} 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
                  Mobile No : {this.state.dataSource.mobile} 
              </Text>
           </View>
            
            
           <View style={styles.list}>
            <Text style={styles.name}>
                  Date Of Birth: {this.state.dataSource.dob} 
              </Text>
           </View>
         
            
           <View style={styles.list}>
            <Text style={styles.name}>
            City  : {this.state.dataSource.city  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            State   : {this.state.dataSource.state  } 
              </Text>
           </View>
           <View style={styles.list}>
            <Text style={styles.name}>
            Pincode   : {this.state.dataSource.pincode   } 
              </Text>
           </View>
            
        </View>
        
        </ScrollView>
      );
    }
  }
class AdminDashboardScreen extends React.Component { 
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/details/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }    
    
    goToProfile = () =>
    {
      this.props.navigation.navigate('Profile');
    }
    goToAttendance = () =>
    {
      this.props.navigation.navigate('Attendance');
    }
    goToHomework = () =>
    {
      this.props.navigation.navigate('Homework');
    }
    goToEvent = () =>
    {
      this.props.navigation.navigate('Event');
    }
    goToFee = () =>
    {
      this.props.navigation.navigate('Fee');
    }
    goToClassTest = () =>
    {
      this.props.navigation.navigate('ClassTest');
    }
    goToLibrary = () =>
    {
      this.props.navigation.navigate('Library');
    }
    goToMessages = () =>
    {
      this.props.navigation.navigate('Message');
    }
    
    goToRemarks = () =>
    {
      this.props.navigation.navigate('Remarks');
    }
    goToUpload = () =>
    {
      this.props.navigation.navigate('Upload');
    }
    goToTimeTable = () =>
    {
      this.props.navigation.navigate('TimeTable');
    }
    goToCalendar = () =>
    {
      this.props.navigation.navigate('Calendar');
    }
    goToLeave = () =>
    {
      this.props.navigation.navigate('Leave');
    }
    goToExam = () =>
    {
      this.props.navigation.navigate('Exam');
    }
    goToQuotes = () =>
    {
      this.props.navigation.navigate('Quotes');
    }
  
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColor }) => (
      <Icon name="dashboard" size={20} color="#000" />
    ),
  };

  render() {
    <Toolbar
    leftElement="menu"
    centerElement="Searchable"
    searchable={{
      autoFocus: true,
      placeholder: 'Search',
    }}
    rightElement={{
        menu: {
            icon: "more-vert",
            labels: ["item 1", "item 2"]
        }
    }}
    onRightElementPress={ (label) => { console.log(label) }}
  />
    return (
      <ScrollView>
      <View style={styles.container}> 
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToProfile }>
            
             <View style={styles.menuBox}>
             <Icon name="user" size={40} color="#000" /> 
                <Text style={styles.info} onPress={() => this.goToProfile}>Profile</Text>
              </View>
           </TouchableOpacity>

            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToFee }> 
                <View style={styles.menuBox}>
                <Icon name="rupee" size={40} color="#000" /> 
                  <Text style={styles.info} onPress={() => this.goToAttendance}>Fee</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToAttendance }> 
              <View style={styles.menuBox}>
              <Icon name="bar-chart" size={40} color="#000" />
                <Text style={styles.info} onPress={() => this.goToAttendance}>Attendance</Text>
              </View>
            </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToClassTest }> 
                <View style={styles.menuBox}>
                <Icon name="bar-chart" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToClassTest}>Class Test</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToHomework }> 
                <View style={styles.menuBox}>
                <Icon name="address-book" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToHomework}>Homework</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToEvent }> 
                <View style={styles.menuBox}>
                <Icon name="calendar" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToEvent}>Event</Text>
                </View>
              </TouchableOpacity> 

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToLibrary }> 
                <View style={styles.menuBox}>
                <Icon name="address-book" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToLibrary}>Library</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToMessages }> 
                <View style={styles.menuBox}>
                <Icon name="envelope" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToMessages}>Messages</Text>
                </View>
              </TouchableOpacity>  
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToRemarks }> 
                <View style={styles.menuBox}>
                <Icon name="comment" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToRemarks}>Remarks</Text>
                </View>
              </TouchableOpacity> 
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToUpload }> 
                <View style={styles.menuBox}>
                <Icon name="upload" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToUpload}>Upload</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToTimeTable }> 
                <View style={styles.menuBox}>
                <Icon name="calendar" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToTimeTable}>Time Table</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToCalendar }> 
                <View style={styles.menuBox}>
                <Icon name="bar-chart" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToCalendar}>Calendar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToLeave }> 
                <View style={styles.menuBox}>
                <Icon name="bar-chart" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToLeave}>Leave</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToExam }> 
                <View style={styles.menuBox}>
                <Icon name="bar-chart" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToExam}>Exam</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = { .5 } onPress={ this.goToQuotes }> 
                <View style={styles.menuBox}>
                <Icon name="bar-chart" size={40} color="#000" />
                  <Text style={styles.info} onPress={() => this.goToQuotes}>Quotes</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
        <View
      style={{
        flexDirection: "row",
        height: 150,
        width:400,
    
      }}
    >
       <Image source={{uri: 'http://eageskool.com/front_asset/extra-images/banner-03.jpg'}}
   style={{width: '100%', height: 150}} /> 
     </View>
          <View
        style={{
          flexDirection: "row",
          height: 150,
          width:'100%', 
          textAlign: 'center', 
         
        }}
      >
         <Image source={{uri: 'http://eageskool.com/front_asset/images/logo.png'}}
     style={{width: 400, height: 100}} /> 
       </View>
      </ScrollView>
    );
  }
  
}
 
class HomeworkScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      url:'',
      dataSource:[], 
      homWorks:[],      
      homework:'',
      options:[],
      setSelectedValue:'',
      sectionOptions:[],
      setSectionSelectedValue:'',
      subjectOptions:[],
      setSubjectSelectedValue:'',
      date:'',
     };     
   }
   
    componentDidMount(){ 
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
       var date =date + '-' + month + '-' + year; 
       this.setState({ 'date': date }) 

        AsyncStorage.getItem('userId').then((value) => 
            this.setState({ 'userId': value })       
        )
        AsyncStorage.getItem('rootUrl').then((value) => 
        this.setState({ 'url': value })       
        )
      
      
        AsyncStorage.getItem('userId', (err, result) => {
        fetch(this.state.url+'/api/student/homework-latest/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
            this.setState({
            loading: false,
            dataSource: responseJson
            })
        }) 
        .catch(error=>console.log(error)) //to catch the errors if any
        });

        AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/student/homework/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            loading: false,
            homWorks: responseJson
          })
        }) 
        .catch(error=>console.log(error)) //to catch the errors if any
        });
        AsyncStorage.getItem('userId', (err, result) => {
        fetch(this.state.url+'/api/admin/getclass/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {  
          this.setState({
            loading: false,
            options: responseJson
          }) 
        }) 
        .catch(error=>console.log(error)) //to catch the errors if any
        });
    } 
    setOptionValue = async (class_id)=>{ 
    this.setState({ 
      setSelectedValue: class_id
    })
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getsection/'+this.state.userId+'/'+class_id)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          sectionOptions: responseJson
      }) 
    }) 
    .catch(error=>console.log(error)) //to catch the errors if any
    });
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getsubject/'+this.state.userId+'/'+class_id)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          subjectOptions: responseJson
      }) 
    }) 
    .catch(error=>console.log(error)) //to catch the errors if any
    });
    }
    setSectionOptionValue = async (data)=>{
        this.setState({ 
        setSectionSelectedValue: data
        })
    }
    setSubjectOptionValue = async (data)=>{
        this.setState({ 
        setSubjectSelectedValue: data
        })
    }
    submitHomework = async ()=>{
        const  {userId,homework,setSelectedValue,setSectionSelectedValue,date,setSubjectSelectedValue}=this.state  
        console.log(setSubjectSelectedValue)
        fetch(this.state.url+'/api/admin/homework/store', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            homework: homework,
            class_id: setSelectedValue,
            section_id: setSectionSelectedValue,
            subject_id: setSubjectSelectedValue,
            date: date,
        })
       
        }).then(response => response.json())
        .then((responseJson)=> {   
            this.setState({
            homework: ''
            });
            Alert.alert(
            responseJson.msg 
            );
        })  
    }    
 
  FlatListItemSeparator = () => {
    return (
      <View style={{
          height: .5,
          width:"100%", 
    }}
    />
    );
  } 
  renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text style={styles.lightText}>{data.item.created_at} 
 {data.item.homework}</Text></TouchableOpacity>

  static navigationOptions = {
    drawerLabel: 'Homework',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="file-o" size={20} color="#000" />
    ),
  }; 
    render() {
        if(this.state.loading){
        return( 
            <View style={styles.loader}> 
            <ActivityIndicator size="large" color="#0c9"/>
            </View>
        )}
        return (
        <ScrollView>
        <View > 
            <View style={styles.rows}> 
            <Picker 
                style={{ height: 50, width: 160,margin:10, borderColor: 'red',
                backgroundColor: '#f5f2f2',
                borderWidth: 1,}} 
                selectedValue={this.state.setSelectedValue}
                onValueChange={(itemValue) => this.setOptionValue(itemValue)}
                >
                { 
                    this.state.options.map((itemValue,index) => { 
                    return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
                    })
                } 
                </Picker>
                <Picker 
                style={{ height: 50, width: 160,margin:10, borderColor: 'red',
                backgroundColor: '#f5f2f2',
                borderWidth: 1,}} 
                selectedValue={this.state.setSectionSelectedValue}
                onValueChange={(itemValue) => this.setSectionOptionValue(itemValue)}
                >
                { 
                    this.state.sectionOptions.map((itemValue,index) => { 
                    return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
                    })
                } 
                </Picker>
            
            </View>
            <View  style={styles.rows}>
                <View> 
                    <Picker 
                    style={{ height: 50, width: 160,margin:10, borderColor: 'red',
                    backgroundColor: '#f5f2f2',
                    borderWidth: 1,}} 
                    selectedValue={this.state.setSubjectSelectedValue}
                    onValueChange={(itemValue) => this.setSubjectOptionValue(itemValue)}
                    >
                    { 
                        this.state.subjectOptions.map((itemValue,index) => { 
                        return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
                        })
                    } 
                    </Picker>
                
                </View>
                <View>
                <DatePicker
                    style={{width: 160,margin:10}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY" 
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
            </View>
            <View>
            <TextInput  style=
            {{
            borderColor: 'gray', borderWidth: 1,margin:10,
            }}       
            editable = {true}
            maxLength = {4000}
            multiline = {true}
            numberOfLines = {10}
            placeholder="Enter Homework"
            onChangeText={text=> this.setState({homework:text})}
            /> 
            </View>
            <View> 
            <TouchableOpacity style={{margin:10}} > 
            <Button onPress={() => this.submitHomework()}  
                title="Save" /> 
            </TouchableOpacity> 
            </View>  
        </View>
        </ScrollView>
        );
    }
}
class AttendanceScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      url:'', 
      options:[],
      setSelectedValue:'',
      sectionOptions:[],
      setSectionSelectedValue:'', 
      date:'',
      attendanceType:[
        {label: 'P', value: 1 },
        {label: 'A', value: 2 },
        {label: 'L', value: 3 },
      ],
      selectedattendance: [],
      students:[],
     };    
   }
    componentDidMount(){  
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var date =date + '-' + month + '-' + year; 
        this.setState({ 'date': date }) 

      AsyncStorage.getItem('userId').then((value) => 
          this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('rootUrl').then((value) => 
      this.setState({ 'url': value })       
      )
    
    
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
          this.setState({
          loading: false,
          dataSource: responseJson
          })
      }) 
      .catch(error=>console.log(error)) //to catch the errors if any
      });

      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          homWorks: responseJson
        })
      }) 
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getclass/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          options: responseJson
        }) 
      }) 
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
    setOptionValue = async (class_id)=>{ 
    this.setState({ 
      setSelectedValue: class_id
    })
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getsection/'+this.state.userId+'/'+class_id)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          sectionOptions: responseJson
      }) 
    }) 
    .catch(error=>console.log(error)) //to catch the errors if any
    });
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getsubject/'+this.state.userId+'/'+class_id)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          subjectOptions: responseJson
      }) 
    }) 
    .catch(error=>console.log(error)) //to catch the errors if any
    });
    }
    setSectionOptionValue = async (data)=>{
        this.setState({ 
        setSectionSelectedValue: data
        })
    }
    setSubjectOptionValue = async (data)=>{
        this.setState({ 
        setSubjectSelectedValue: data
        })
    }
    submitHomework = async ()=>{
        const  {userId,homework,setSelectedValue,setSectionSelectedValue,date,setSubjectSelectedValue}=this.state  
        console.log(setSubjectSelectedValue)
        fetch(this.state.url+'/api/admin/attendance/store', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            homework: homework,
            class_id: setSelectedValue,
            section_id: setSectionSelectedValue,
            subject_id: setSubjectSelectedValue,
            date: date,
        })
       
        }).then(response => response.json())
        .then((responseJson)=> {   
            this.setState({
            homework: ''
            });
            Alert.alert(
            responseJson.msg 
            );
        })  
    }    
  static navigationOptions = {
    drawerLabel: 'Attendance',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="clock-o" size={20} color="#000" />
    ),
  };
  setOptionValue = async (class_id)=>{ 
    this.setState({ 
      setSelectedValue: class_id
    })
    AsyncStorage.getItem('userId', (err, result) => {
      fetch(this.state.url+'/api/admin/getsection/'+this.state.userId+'/'+class_id)
      .then(response => response.json())
      .then((responseJson)=> {  
        this.setState({
          loading: false,
          sectionOptions: responseJson
      }) 
    }) 
    .catch(error=>console.log(error)) //to catch the errors if any
    });
   
    }
    setSectionOptionValue = async (section_id)=>{ 
        this.setState({ 
        setSectionSelectedValue: section_id
        }) 
        
        AsyncStorage.getItem('userId', (err, result) => {  
            fetch(this.state.url+'/api/admin/getstudent/'+this.state.setSelectedValue+'/'+section_id)
            .then(response => response.json())
            .then((responseJson)=> {   
                
                this.setState({loading: false,selectedattendance:[]});
                this.setState({loading: false,students:[]});
                let selectedattendance=this.state.selectedattendance; 
                responseJson.map((itemValue,index) => { 
                    selectedattendance.push({ id: itemValue.id,type: 1})
                }) 
                this.setState({loading: false,selectedattendance:selectedattendance});

                this.setState({
                loading: false,
                students: responseJson
                })  
                AsyncStorage.getItem('userId', (err, result) => {  
                    fetch(this.state.url+'/api/admin/get-attendance/'+this.state.setSelectedValue+'/'+section_id+'/'+this.state.date)
                    .then(response => response.json())
                    .then((responseJson)=> {   
                        if(responseJson.length !=0){
                            this.setState({loading: false,selectedattendance:[]}); 
                            let selectedattendance=this.state.selectedattendance; 
                            responseJson.map((itemValue,index) => { 
                                selectedattendance.push({ id: itemValue.student_id,type: itemValue.attendance_type_id})
                            }) 
                            this.setState({loading: false,selectedattendance:selectedattendance});  
                        }                         
                    }).catch(error=>console.log(error)) //to catch the errors if any
                });
          }) 
          .catch(error=>console.log(error)) //to catch the errors if any
        }); 
        
    }
    setAttendance = async (value)=>{ 
        var strArray = value.split("_");
       var student_id =strArray[0];
       var attendance =strArray[1];
       
        let selectedattendance = this.state.selectedattendance; 
        if(selectedattendance.length!=0){
            let updateValue =0;
            for (let index = 0; index < selectedattendance.length; index++) {
                const element = selectedattendance[index]; 
                if(element.id==student_id){ 
                    updateValue =1; 
                    selectedattendance[index] = { id: student_id,type: attendance};  
                }  
            }

            if(updateValue==0){
                selectedattendance.push({ id: student_id,type: attendance})
            } 
             
        }else{ 
            selectedattendance.push({ id: student_id,type: attendance})
            
        } 
        this.setState({ selectedattendance:selectedattendance }); 
    }

    setDate = async (date)=>{ 
        this.setState({ 
        date: date
        })  
        AsyncStorage.getItem('userId', (err, result) => {  
            fetch(this.state.url+'/api/admin/getstudent/'+this.state.setSelectedValue+'/'+this.state.setSectionSelectedValue)
            .then(response => response.json())
            .then((responseJson)=> {   
                
                this.setState({loading: false,selectedattendance:[]});
                this.setState({loading: false,students:[]});
                let selectedattendance=this.state.selectedattendance; 
                responseJson.map((itemValue,index) => { 
                    selectedattendance.push({ id: itemValue.id,type: 1})
                }) 
                this.setState({loading: false,selectedattendance:selectedattendance});

                this.setState({
                loading: false,
                students: responseJson
                })  
                AsyncStorage.getItem('userId', (err, result) => {  
                    fetch(this.state.url+'/api/admin/get-attendance/'+this.state.setSelectedValue+'/'+this.state.setSectionSelectedValue+'/'+date)
                    .then(response => response.json())
                    .then((responseJson)=> {   
                        if(responseJson.length !=0){
                            this.setState({loading: false,selectedattendance:[]}); 
                            let selectedattendance=this.state.selectedattendance; 
                            responseJson.map((itemValue,index) => { 
                                selectedattendance.push({ id: itemValue.student_id,type: itemValue.attendance_type_id})
                            }) 
                            this.setState({loading: false,selectedattendance:selectedattendance});  
                        }                         
                    }).catch(error=>console.log(error)) //to catch the errors if any
                });
            }) 
            .catch(error=>console.log(error)) //to catch the errors if any
        }); 
    }
    
     
    submitattendance = async ()=>{ 
        const  {userId,selectedattendance,setSelectedValue,setSectionSelectedValue,date}=this.state   
        fetch(this.state.url+'/api/admin/attendance/store', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId, 
            class_id: setSelectedValue,
            section_id: setSectionSelectedValue, 
            date: date,
            attendenceType_id: selectedattendance,
        })
       
        }).then(response => response.json())
        .then((responseJson)=> {   
             
            Alert.alert(
            responseJson.msg 
            );
        })  
    } 


    render() {
       
        if(this.state.loading){
        return( 
            <View style={styles.loader}> 
            <ActivityIndicator size="large" color="#0c9"/>
            </View>
        )}
        return (
        <ScrollView>
            <View> 
                <View style={styles.rows}> 
                <Picker 
                    style={{ height: 50, width: 160,margin:10, borderColor: 'red',
                    backgroundColor: '#f5f2f2',
                    borderWidth: 1,}} 
                    selectedValue={this.state.setSelectedValue}
                    onValueChange={(itemValue) => this.setOptionValue(itemValue)}
                    >
                    { 
                        this.state.options.map((itemValue,index) => { 
                        return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
                        })
                    } 
                    </Picker>
                    <Picker 
                    style={{ height: 50, width: 160,margin:10, borderColor: 'red',
                    backgroundColor: '#f5f2f2',
                    borderWidth: 1,}} 
                    selectedValue={this.state.setSectionSelectedValue}
                    onValueChange={(itemValue) => this.setSectionOptionValue(itemValue)}
                    >
                    { 
                        this.state.sectionOptions.map((itemValue,index) => { 
                        return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
                        })
                    } 
                    </Picker>
                
                </View>  
                <View>
                    <DatePicker
                        style={{width: 160,margin:10}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY" 
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        }}
                        onDateChange={(date) => this.setDate(date)}
                    />
                </View> 
                <View  style={{ margin: 10}}>
                    
                    <View style={styles.rows}> 
                    { 
                         
                        this.state.students.map((itemValue,index) => { 
                            var radio_props = [
                                {label: 'P', value: itemValue.id+'_'+1 },
                                {label: 'A', value: itemValue.id+'_'+2 },
                                {label: 'L', value: itemValue.id+'_'+3 }
                              ]; 
                        return <RadioForm
                            formHorizontal={true}
                            animation={true}
                            >
                             <Text style={{width:100}}>{itemValue.registration_no}</Text>   
                            { 
                                radio_props.map((obj, i) => ( 
                                <RadioButton labelHorizontal={true} key={i+1} >
                                    <RadioButtonInput
                                    obj={obj}
                                    index={i} 
                                    isSelected={this.state.selectedattendance.length>0?this.state.selectedattendance[index].id+'_'+this.state.selectedattendance[index].type === itemValue.id+'_'+(i+1):null} 
                                    onPress={(value) => this.setAttendance(value)}
                                    borderWidth={1}
                                    buttonInnerColor={'#e74c3c'}
                                    buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                    buttonSize={20}
                                    buttonOuterSize={40}
                                    buttonStyle={{}}
                                    testID='noteType,1'
                                    buttonWrapStyle={{marginLeft: 10}}
                                    />
                                    <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    
                                    labelStyle={{fontSize: 20, color: '#2ecc71'}}
                                    labelWrapStyle={{}}
                                    />
                                </RadioButton>
                                ))
                            }  
                            </RadioForm>   
                        })  
                    }
                    
                    
                    </View> 
                </View>
            <View> 
            <TouchableOpacity style={{margin:10}} > 
            <Button onPress={() => this.submitattendance()}  
                title="Save" /> 
            </TouchableOpacity> 
            </View>  
        </View>
        </ScrollView>
        );
    }
}
class FeeScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],
      feeUptoSource:[],       
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/last-fee/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
       
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      AsyncStorage.getItem('userId', (err, result) => {
        fetch(ROOT_URL+'/api/student/fee-upto/'+this.state.userId)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
            loading: false,
            feeUptoSource: responseJson
          })
         
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        });
      
    } 
    
  static navigationOptions = {
    drawerLabel: 'Fee',
    drawerIcon: ({ tintColor }) => ( 
    <Icon name="inr" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Fee Upto Amount : {this.state.feeUptoSource.feeUpto}</Text>
        <Text style={styles.name}> Last Fee Amount : {this.state.dataSource.receipt_amount}</Text>
        <Text style={styles.name}> Last Receipt Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.receipt_date}</Moment> </Text>
        <Text style={styles.name}> Last Receipt No : {this.state.dataSource.receipt_no}</Text>
        
      <Text style={styles.name}>
      
      
      
        </Text>
         
      </View>
      
     
    );
  }
}
class ClassTestScreen extends React.Component {
    constructor(props) {    
      super(props);    
      this.state = {
        loading: true,
        dataSource: [],
        userId:'',
        url:'', 
        isModalVisible: false,
        description:'',
        options:[],
        setSelectedValue:'',
        sectionOptions:[],
        setSectionSelectedValue:'',
        subjectOptions:[],
        setSubjectSelectedValue:'',
        academicYearOptions:[],
        setAcademicYearOptionsSelectedValue:'',
        isIncludeTermExam:[  { name: 'None', id: '0' },
        { name: 'Is Include Term Exam', id: '1' }],
        setIsIncludeTermExamSelectedValue:'',
        maxMarks:'',
        date:'',
       };     
     }
     
      componentDidMount(){ 
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
         var date =date + '-' + month + '-' + year; 
         this.setState({ 'date': date }) 
  
          AsyncStorage.getItem('userId').then((value) => 
              this.setState({ 'userId': value })       
          )
          AsyncStorage.getItem('rootUrl').then((value) => 
          this.setState({ 'url': value })       
          ) 
          AsyncStorage.getItem('userId', (err, result) => {
          fetch(ROOT_URL+'/api/student/homework/'+this.state.userId)
          .then(response => response.json())
          .then((responseJson)=> {
            this.setState({
              loading: false,
              homWorks: responseJson
            })
          }) 
          .catch(error=>console.log(error)) //to catch the errors if any
          });
          AsyncStorage.getItem('userId', (err, result) => {
          fetch(this.state.url+'/api/admin/getclass/'+this.state.userId)
          .then(response => response.json())
          .then((responseJson)=> {  
            this.setState({
              loading: false,
              options: responseJson
            }) 
          }) 
          .catch(error=>console.log(error)) //to catch the errors if any
          });
          
          AsyncStorage.getItem('userId', (err, result) => {
          fetch(this.state.url+'/api/admin/academic-year')
          .then(response => response.json())
          .then((responseJson)=> {  
            this.setState({
              loading: false,
              academicYearOptions: responseJson
            })  
          }) 
          .catch(error=>console.log(error)) //to catch the errors if any
          });
      } 
      setOptionValue = async (class_id)=>{ 
      this.setState({ 
        setSelectedValue: class_id
      })
      AsyncStorage.getItem('userId', (err, result) => {
        fetch(this.state.url+'/api/admin/getsection/'+this.state.userId+'/'+class_id)
        .then(response => response.json())
        .then((responseJson)=> {  
          this.setState({
            loading: false,
            sectionOptions: responseJson
        }) 
      }) 
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      AsyncStorage.getItem('userId', (err, result) => {
        fetch(this.state.url+'/api/admin/getsubject/'+this.state.userId+'/'+class_id)
        .then(response => response.json())
        .then((responseJson)=> {  
          this.setState({
            loading: false,
            subjectOptions: responseJson
        }) 
      }) 
      .catch(error=>console.log(error)) //to catch the errors if any
      });
      }
      setSectionOptionValue = async (data)=>{
          this.setState({ 
          setSectionSelectedValue: data
          })
      }
      setSubjectOptionValue = async (data)=>{
          this.setState({ 
          setSubjectSelectedValue: data
          })
      }
      setAcademicYearOptions = async (data)=>{
          this.setState({ 
            setAcademicYearOptionsSelectedValue: data
          })
      }
      
      setIsIncludeTermExam = async (data)=>{ 
          this.setState({ 
            setIsIncludeTermExamSelectedValue: data
          })
      }
      submitClassTest = async ()=>{
          const  {userId,description,setSelectedValue,setSectionSelectedValue,date,setSubjectSelectedValue,setAcademicYearOptionsSelectedValue,setIsIncludeTermExamSelectedValue,maxMarks}=this.state  
         
          fetch(this.state.url+'/api/admin/classtest/store', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: userId,
              description: description,
              class_id: setSelectedValue,
              section_id: setSectionSelectedValue,
              subject: setSubjectSelectedValue,
              is_include_term_exam: setIsIncludeTermExamSelectedValue,
              academic_year_id: setAcademicYearOptionsSelectedValue,
              test_date: date,
              max_marks: maxMarks,
          })
         
          }).then(response => response.json())
          .then((responseJson)=> {   
              this.setState({
              description: ''
              }); 
              Alert.alert(
              responseJson.msg 
              );
          })  
      }
      showClassTest = async ()=>{
        const  {userId,setSelectedValue,setSectionSelectedValue,date,setSubjectSelectedValue,setAcademicYearOptionsSelectedValue}=this.state  
       
        fetch(this.state.url+'/api/admin/classtest/show', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            class_id: setSelectedValue,
            section_id: setSectionSelectedValue,
            subject: setSubjectSelectedValue,
            academic_year_id: setAcademicYearOptionsSelectedValue,
            test_date: date,
        })
       
        }).then(response => response.json())
        .then((responseJson)=> {  
          if(responseJson.status==1)
            this.setState({
              dataSource: responseJson.data
            });  
        })  
    }
    showStatus = async ()=>{
        console.log('d')  
    }  
    showModel = async ()=>{
        console.log('d')  
    }    
    goToOtherTab = async ()=>{
        console.log('d')
        this.props.navigation.navigate('Fee');
    }     
    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };
    FlatListItemSeparator = () => {
      return (
        <View style={{
            height: .5,
            width:"100%", 
      }}
      />
      );
    } 
    renderItem=(data)=>
  <TouchableOpacity style={styles.list}>
  <Text style={styles.lightText}>{data.item.created_at} 
   {data.item.homework}</Text></TouchableOpacity>
  
    static navigationOptions = {
        drawerLabel: 'Class Test',
        drawerIcon: ({ tintColor }) => ( 
        <Icon name="file" size={20} color="#000" />
        ),
    }; 
      render() {
        return(
            <WebView
            source={{ uri: 'http://eageskool.com/admin/class-test-api?id=1' }}
            style={{ marginTop: 20 }}
          />
         )}
        //   if(this.state.loading){
        //   return( 
        //       <View style={styles.loader}> 
        //       <ActivityIndicator size="large" color="#0c9"/>
        //       </View>
        //   )}
        //   return (
        //   <ScrollView> 
        //   <View > 
              
        //       <View style={styles.rows}> 
        //       <Picker 
        //           style={{ height: 50, width: 160,margin:10, borderColor: 'red',
        //           backgroundColor: '#f5f2f2',
        //           borderWidth: 1,}} 
        //           selectedValue={this.state.setSelectedValue}
        //           onValueChange={(itemValue) => this.setOptionValue(itemValue)}
        //           >
        //           { 
        //               this.state.options.map((itemValue,index) => { 
        //               return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
        //               })
        //           } 
        //           </Picker>
        //           <Picker 
        //           style={{ height: 50, width: 160,margin:10, borderColor: 'red',
        //           backgroundColor: '#f5f2f2',
        //           borderWidth: 1,}} 
        //           selectedValue={this.state.setSectionSelectedValue}
        //           onValueChange={(itemValue) => this.setSectionOptionValue(itemValue)}
        //           >
        //           { 
        //               this.state.sectionOptions.map((itemValue,index) => { 
        //               return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
        //               })
        //           } 
        //           </Picker>
              
        //       </View>
        //       <View  style={styles.rows}>
        //           <View> 
        //               <Picker 
        //               style={{ height: 50, width: 160,margin:10, borderColor: 'red',
        //               backgroundColor: '#f5f2f2',
        //               borderWidth: 1,}} 
        //               selectedValue={this.state.setSubjectSelectedValue}
        //               onValueChange={(itemValue) => this.setSubjectOptionValue(itemValue)}
        //               >
        //               { 
        //                   this.state.subjectOptions.map((itemValue,index) => { 
        //                   return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
        //                   })
        //               } 
        //               </Picker>
                  
        //           </View>
        //           <View>
        //           <DatePicker
        //               style={{width: 160,margin:10}}
        //               date={this.state.date}
        //               mode="date"
        //               placeholder="select date"
        //               format="DD-MM-YYYY" 
        //               confirmBtnText="Confirm"
        //               cancelBtnText="Cancel"
        //               customStyles={{
        //               dateIcon: {
        //                   position: 'absolute',
        //                   left: 0,
        //                   top: 4,
        //                   marginLeft: 0
        //               },
        //               dateInput: {
        //                   marginLeft: 36
        //               }
        //               // ... You can check the source to find the other keys.
        //               }}
        //               onDateChange={(date) => {this.setState({date: date})}}
        //           />
        //           </View>
                  
        //       </View>
        //       <View style={styles.rows}> 
        //         <View>
        //         <Picker 
        //             style={{ height: 50, width: 160,margin:10, borderColor: 'red',
        //             backgroundColor: '#f5f2f2',
        //             borderWidth: 1,}} 
        //             selectedValue={this.state.setAcademicYearOptionsSelectedValue}
        //             onValueChange={(itemValue) => this.setAcademicYearOptions(itemValue)}
        //             >
        //             { 
        //                 this.state.academicYearOptions.map((itemValue,index) => { 
        //                 return <Picker.Item key={itemValue.id} value={itemValue.id} label={itemValue.name} />;
        //                 })
        //             } 
        //             </Picker> 
        //         </View>
        //         <View> 
        //         <Picker 
        //             style={{ height: 50, width: 160,margin:10, borderColor: 'red',
        //             backgroundColor: '#f5f2f2',
        //             borderWidth: 1,}} 
        //             selectedValue={this.state.setIsIncludeTermExamSelectedValue}
        //             onValueChange={(itemValue) => this.setIsIncludeTermExam(itemValue)}
        //             >
        //             { 
        //                 this.state.isIncludeTermExam.map((itemValue,index) => { 
        //                 return <Picker.Item key={itemValue} value={itemValue.id} label={itemValue.name} />;
        //                 })
        //             } 
        //             </Picker> 
        //         </View>
        //         </View>
        //       <View>
        //       <TextInput style=
        //       {{
        //       borderColor: 'gray', borderWidth: 1,margin:10,
        //       }}      
        //       underlineColorAndroid='rgba(0,0,0,0)' 
        //       maxLength = {3}
        //       keyboardType="number-pad"
        //       placeholder="Max Marks" 
        //       selectionColor="#fff" 
        //       onChangeText={text=> this.setState({maxMarks:text})}
        //       />
        //       </View>
        //       <View>
        //       <TextInput  style=
        //       {{
        //       borderColor: 'gray', borderWidth: 1,margin:10,
        //       }}       
        //       editable = {true}
        //       maxLength = {4000}
        //       multiline = {true}
        //       numberOfLines = {10}
        //       placeholder="Enter Description"
        //       onChangeText={text=> this.setState({description:text})}
        //       /> 
        //       </View>
        //       <View style={styles.rows}> 
        //       <View> 
        //       <TouchableOpacity style={{margin:20,height: 50, width: 160}} > 
        //       <Button onPress={() => this.submitClassTest()}  
        //           title="Save" /> 
        //       </TouchableOpacity> 
        //       </View> 
        //       <View> 
        //       <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //       <Button onPress={() => this.showClassTest()}  
        //           title="Show" /> 
        //       </TouchableOpacity> 
        //       </View> 
        //       </View> 

            
        //       <View> 
        //          { 
        //             this.state.dataSource.map((itemValue,index) => {  
        //                    return <Collapse>
        //                         <CollapseHeader style={{borderBottomWidth:1,borderTopWidth:1,padding:10}}>
        //                         <View onPress={() => this.show()}>
        //                             <Text>{itemValue.id} - <Moment element={Text} format="DD/MM/YYYY">{itemValue.test_date}</Moment> - {itemValue.discription}</Text> 
                                   
        //                         </View>
        //                         </CollapseHeader>
        //                         <CollapseBody style={{borderBottomWidth:1,borderTopWidth:1,height:800}}>
        //                             <View style={styles.rows}>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160,}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Edit" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Add Marks" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Verify" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Compile" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="SMS Send Test Info" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="SMS Send Marks Info" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Cancel Test" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Re Cancel Test" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Delete" /> 
        //                             </TouchableOpacity>
        //                             <TouchableOpacity style={{margin:10,height: 50, width: 160}} > 
        //                                 <Button onPress={() => this.showClassTest()}  
        //                                     title="Print" /> 
        //                             </TouchableOpacity>
        //                             </View>
                                    
                                    
        //                         </CollapseBody>
        //                     </Collapse> 
        //             })
        //         }   
                 
        //       </View> 
        //       <View> 
               
        //       </View> 
            
        //   </View>
        
        //   </ScrollView>
        //   );
    //   }
  }

class EventScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/event/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
  Start Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.start_date}</Moment>  {"\n"}
  End Date :<Moment element={Text} format="DD/MM/YYYY">{data.item.end_date}</Moment> {"\n"}
  Event Title : {data.item.event_name}
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Event',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
  }
class LibraryScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Library',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="book" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        <Text style={styles.name}> Date : <Moment element={Text} format="DD/MM/YYYY">{this.state.dataSource.created_at}</Moment> </Text>
      <Text style={styles.name}>
      
      {this.state.dataSource.homework} 
      
        </Text>
      </View>
      
     
    );
  }
}
class MessageScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/homework-latest/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    }  
  static navigationOptions = {
    drawerLabel: 'Message',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="comments" size={20} color="#000" />
    ),
  };

  

  render() {
    return (
      
      <View style={styles.list}>
        
      <Text style={styles.name}>
      
      'message'
      
        </Text>
      </View>
      
     
    );
  }
}
class RemarksScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
Teacher: {data.item.admin.first_name} {"\n"}
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
 
  Remarks: {data.item.remark}
   
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Remarks',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class UploadScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
Teacher: {data.item.admin.first_name} {"\n"}
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
 
  Remarks: {data.item.remark}
   
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Upload',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="upload" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
    <View style={styles.list}>
      <Text style={styles.name}>
         Document Type 
        </Text> 
       <Picker  itemStyle={{ backgroundColor: "white", color: "white", fontFamily:"Ebrima", fontSize:17 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item color="black"  label="Java" value="java" />
          <Picker.Item color="black" label="JavaScript" value="js" />
        </Picker>
    </View>
      
    )}
}
 
class TimeTableScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
    <Text style={styles.name}>
    Teacher: {data.item.admin.first_name} {"\n"}
      Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
    
      Remarks: {data.item.remark}
      
    </Text>
  </Text>  

  static navigationOptions = {
    drawerLabel: 'Time Table',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class CalendarScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'admin/loginapi/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.name}>
Teacher: {data.item.admin.first_name} {"\n"}
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
 
  Remarks: {data.item.remark}
   
</Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Calendar',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="calendar-o" size={20} color="#000" />
    ),
  };
  render() {
    
    return(
        <WebView
        source={{ uri: 'http://eageskool.com/admin/class-test-api' }}
        style={{ marginTop: 20 }}
      />
     )}
}
class LeaveScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
  <Text style={styles.name}>
  Teacher: {data.item.admin.first_name} {"\n"}
    Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
  
    Remarks: {data.item.remark}
    
  </Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Leave',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="sign-out" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class ExamScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/remarks/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
  <Text style={styles.list}>
  <Text style={styles.name}>
  Teacher: {data.item.admin.first_name} {"\n"}
    Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.created_at}</Moment>  {"\n"}
  
    Remarks: {data.item.remark}
    
  </Text></Text>  

  static navigationOptions = {
    drawerLabel: 'Exam',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="file" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}
class QuotesScreen extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {
      loading: true,
      userId:'',
      dataSource:[],      
     };     
   }
    componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => 
      this.setState({ 'userId': value })       
      )
      AsyncStorage.getItem('userId', (err, result) => {
      fetch(ROOT_URL+'/api/student/quotes/'+this.state.userId)
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      });
    } 
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
          
      }}
      />
      );
    }
   renderItem=(data)=>
<Text style={styles.list}>
<Text style={styles.dates}>
   Date : <Moment element={Text} format="DD/MM/YYYY">{data.item.date}</Moment>  {"\n"} 
</Text>
<Text style={styles.quotes}>"{data.item.discription}"</Text>
</Text>  

  static navigationOptions = {
    drawerLabel: 'Quotes',
    drawerIcon: ({ tintColor }) => ( 
      <Icon name="question-circle" size={20} color="#000" />
    ),
  };
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return(
      <View style={styles.container}>
      <FlatList
         data= {this.state.dataSource}
         ItemSeparatorComponent = {this.FlatListItemSeparator}
         renderItem= {item=> this.renderItem(item)}
         keyExtractor= {item=>item.id.toString()}
      />
     </View>
     )}
}


 

const MyDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: AdminDashboardScreen,
  },
Profile: {
  screen: StudentProfile,
}, 
Homework: {
  screen: HomeworkScreen,
},  
Fee: {
  screen: FeeScreen,
},
Attendance: {
  screen: AttendanceScreen,
},
ClassTest: {
  screen: ClassTestScreen,
},
Event: {
  screen: EventScreen,
},
Library: {
  screen: LibraryScreen,
},
Message: {
  screen: MessageScreen,
},
Remarks: {
  screen: RemarksScreen,
},
Upload: {
  screen: UploadScreen,
},
TimeTable: {
  screen: TimeTableScreen,
},
Calendar: {
  screen: CalendarScreen,
},
Leave: {
  screen: LeaveScreen,
},
Exam: {
  screen: ExamScreen,
},
Quotes: {
  screen: QuotesScreen,
},
  
}); 

const Stackcontainer =createStackNavigator({
  
  defaulthome:MyDrawerNavigator,
   
},{  
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions:({navigation})=> {
      return{
        title: ' ',
        /* No more header config here! */
      headerLeft:  <Icon name="bars" style={{ marginLeft: 7 }} size={30} color="#FFF"  onPress={() => { navigation.toggleDrawer() }} />,
      headerRight: <Icon name="home" style={{ marginRight: 7 }}  size={30} color="#FFF"  onPress={() => { navigation.navigate('Dashboard') }} />,
      headerStyle: {
        backgroundColor: '#455a64',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      }
       
    },
    
})

const AppContainer = createAppContainer(Stackcontainer);

export default class App extends React.Component {
  static navigationOptions={
    header :null
  }
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  loginTextSection: {
    width: '100%',
    height: '30%',
 },

 loginButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
 },

 inputText: {
    marginLeft: '20%',
    width: '60%'
 },

 loginButton: {
   backgroundColor: 'grey',
   color: 'white'
 },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  quotes:{
    fontSize:28,
    color:"#FFFFFF",
    fontWeight:'600',
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
      paddingVertical: 13,
      alignItems: 'center'
      
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
  dates:{
    fontSize:15,
    color:"#FFFFFF",
    fontWeight:'200', 
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:14,
    marginTop:10,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#eaeaea",
    width:116,
    height:110,
    alignItems: 'center',
    justifyContent: 'center',
    margin:7,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:18,
    color: "#696969",
  },
  list:{
    paddingVertical: 2,
    margin: 2,
    backgroundColor: "#5d5b5b",
    fontSize:22, 
    padding:5,
    fontWeight:'600',
    
   },
   rows: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width:'100%'
  },
  col: {
    width: '50%' // is 50% of container width
  }
   
});

 