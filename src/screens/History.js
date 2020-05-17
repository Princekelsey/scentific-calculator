import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { List, Text } from "react-native-paper";
import Fire from "../../firebase";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      isStateChanged: false,
    };
  }

  componentDidMount() {
    // get calculated history from database
    Fire.getData(this.setData);
  }

  setData = (historyData) => {
    this.setState({ history: historyData });
  };

  listenToStateChange = () => {
    this.setState({ isStateChanged: !this.state.isStateChanged });
  };

  handleDelete(id) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this file?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            Fire.removeItem(id);
            this.listenToStateChange();
          },
        },
      ],
      { cancelable: true }
    );
  }

  render() {
    const { history } = this.state;

    return (
      <View style={styles.container}>
        {history.length ? (
          <FlatList
            data={history}
            //   numColumns={2}
            renderItem={({ item }) => (
              <List.Item
                title={item.input}
                description={item.result}
                titleStyle={styles.listTitle}
                onPress={() => this.handleDelete(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.text}>No file saved yet</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#ffff",
  },
  listTitle: {
    fontSize: 15,
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});
