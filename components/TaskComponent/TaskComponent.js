import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import TaskItemComponent from "./TaskItemComponent";
import * as Google from 'expo-google-app-auth';
import axios from 'axios';


export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTasks: [
        {
          id: 1,
          title: "Task 1",
          content: "App Crud Feature"
        },
        {
          id: 2,
          title: "Task 2",
          content: "Set timer and alert for each task"
        }
      ],
      num: 0,
      selected: [],
      listImages: []
    };
  }

  openPhotos = () => {
    const options = {
      first: 5
    };
    MediaLibrary.getAssetsAsync(options).then(response => {
      this.setState({
        listImages: response.assets
      });
      console.log(response);
    });

    console.log("hi");
  };

  getSelectedImages = (images, current) => {
    var num = images.length;

    this.setState({
      num: num,
      selected: images
    });

    console.log(current);
    console.log(this.state.selected);
  };

  handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Start"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          // start
          this.setState({
            showSlider: true,
          })

        }
      }
    );
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    // this.getPermissionAsync();
    // this.googleSheetLogin();
    this.getListTasks();
  }

  getListTasks = () => {
    this.setState({
      isLoading: true
    })
    axios.get('http://api-2019.herokuapp.com/posts/')
      .then(response => {
        console.log(123)
        let mappedListTasks = [];
        if (response.data && response.data.posts) {
          mappedListTasks = this.mapListTasks(response.data.posts)
        }
        this.setState({
          listTasks: mappedListTasks,
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false
        })
      })
  }

  mapListTasks = (data) => {
    return data
  }

  googleSheetLogin = async () => {
    const response = await Google.logInAsync({
      iosClientId: `1072011383365-1t23c52mpgnkbcvd3p4e4so5bf88lnqu.apps.googleusercontent.com`,
      // androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
      // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    });
    console.log(98, response);
    
    // if (type === 'success') {
    //   /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
    //   console.log(user);
    // }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  handleDoneTask = (id) => {
    if (!id) return;
    const tempListTasks = this.state.listTasks;
    const index = tempListTasks.findIndex(item => item.id === id);
    tempListTasks.splice(index, 1)
    this.setState({
      listTasks: tempListTasks,
    })
  }

  render() {
  
    const { listTasks, image, listImages, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      )
    }
    return (
      // <ScrollView>
      //   {listImages.map(item => {
      //     console.log(item);
      //     return (
      //       <Image
      //         source={{ uri: item.uri }}
      //         style={{ width: 200, height: 200 }}
      //       />
      //     );
      //   })}
      // </ScrollView>
      <ScrollView style={{ marginTop: 30, width: "100%" }}>
        {listTasks.map((item, index) => {
          return (
            <TaskItemComponent data={item} handleDoneTask={this.handleDoneTask}/>
          );
        })}
        <TouchableOpacity onPress={() => this.openPhotos()}>
          <Text>Open photos</Text>
        </TouchableOpacity>
        <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
      </ScrollView>
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   <Button
      //     title="Pick an image from camera roll"
      //     onPress={this._pickImage}
      //   />
      //   {image && (
      //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      //   )}
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
