import "react-native-gesture-handler";
import React, { Component } from "react";
import MainScreen from "../screens/MainScreen";
import History from "../screens/History";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Calculator from "../../logic";
import Fire from "../../firebase";

const Stack = createStackNavigator();

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "",
      result: 0,
    };

    //initialize calculator
    this.calculator = new Calculator();
  }

  handleClick = (keyLog, math) => {
    this.calculator.keyClick(keyLog, math);
    this.setState({
      displayValue: this.calculator.mainDisplay(),
      result: this.calculator.calculatedResult(),
    });
  };

  render() {
    const { displayValue, result } = this.state;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calculator">
          <Stack.Screen name="Calculator">
            {(props) => (
              <MainScreen
                {...props}
                result={result}
                log={displayValue}
                keyClick={this.handleClick}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
