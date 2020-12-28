import * as React from 'react';
import { View, Text , Button,StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import { Dashboard } from './src/screens/Dashboard';
import { SearchVoter } from './src/screens/SearchVoter';
import { Profile } from './src/screens/Profile';
import { NumberUpdate } from './src/screens/NumberUpdate';
import { VotePoll } from './src/screens/VotePoll';
import { FamilyMapping } from './src/screens/FamilyMapping';
import { CreateMapping } from './src/screens/CreateMapping';
import { MappingDetails } from './src/screens/MappingDetails';



function HomeScreen({ navigation }) { 
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
      <Button
        title="Configure Data"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator(); 
const DashboardStack = createStackNavigator(); 
function DashboardStak() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen options={{          
          headerLeft: () =>  null,
        }} name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen  name="Profile" component={Profile} />
      <DashboardStack.Screen  name="SearchVoter"  component={SearchVoter} options={{ 
           title: 'Search Voter' ,
        }} />
      <DashboardStack.Screen  name="NumberUpdate"  component={NumberUpdate} options={{ 
           title: 'Number Update' ,
        }} />
      <DashboardStack.Screen  name="VotePoll"  component={VotePoll} options={{ 
           title: 'Vote Poll' ,
        }} />
        <DashboardStack.Screen  name="FamilyMapping"  component={FamilyMapping} options={{ 
           title: 'Family Mapping' ,
        }} /> 
        <DashboardStack.Screen  name="CreateMapping"  component={CreateMapping} options={{ 
           title: 'Create Mapping' ,
        }} /> 
        <DashboardStack.Screen  name="MappingDetails"  component={MappingDetails} options={{ 
           title: 'Mapping Details' ,
        }} />  
    </DashboardStack.Navigator>
  );
}

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Details" component={DetailsScreen} />        
        <Stack.Screen name="Dashboard" options={{
          
          headerLeft: () =>  null,
           headerShown: false ,
        }} component={DashboardStak} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});
export default App;