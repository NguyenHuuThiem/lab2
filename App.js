import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Button } from 'react-native';
import Manager from './Manager';


const Stack = createNativeStackNavigator();

const Home = (props) => {
  const navigation = props.navigation;
    return (
    <View>
      <Button 
      title='Thông tin cá nhân' 
      onPress={() => navigation.navigate('Profile')}
      />
    </View>
    );
};

const App = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Manager} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};

export default App;