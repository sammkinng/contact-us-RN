import React from 'react';
import qs from 'qs';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Colors, Sizes, icons, images } from './constants'
import { FormInput, FormButton } from './components';

const App = () => {
  const [data, setData] = React.useState({
    name: '',
    mail: '',
    phone: '',
    msg: '',
    valid_name: true,
    valid_mail: true,
    valid_phone: true,
    valid_msg: true
  })
  const validate_name = (val) => {
    if (val.trim() === '') {
      setData({
        ...data,
        name: val,
        valid_name: false
      });
    }
    else {
      setData({
        ...data,
        name: val,
        valid_name: true
      });
    }
  }
  const validate_mail = (val) => {
    var tt = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (tt.test(val)) {
      setData({
        ...data,
        mail: val,
        valid_mail: true
      });
      // console.log('true');
    } else {
      setData({
        ...data,
        mail: val,
        valid_mail: false
      });
      // console.log('false');
    }
  }
  const validate_msg = (val) => {
    if (val.trim() === '') {
      setData({
        ...data,
        msg: val,
        valid_msg: false
      });
    }
    else {
      setData({
        ...data,
        msg: val,
        valid_msg: true
      });
    }
  }
  const validate_phone = (val) => {
    if (val.length === 10) {
      setData({
        ...data,
        phone: val,
        valid_phone: true
      });
    }
    else {
      setData({
        ...data,
        phone: val,
        valid_phone: false
      });
    }
  }
  const send_email = async () => {
    let url = `mailto:info@redpositive.in`
    const query = qs.stringify({
      subject: 'Complaint !',
      body: `<p>Name:  ${data.name}</p>
      <p>Phone no:   ${data.phone}</p>
      <p>Message:  ${data.msg}</p>
      `,
    })
    if (query.length) {
      url += `?${query}`;
    }
    const canOpen = await Linking.canOpenURL(url)
    if (!canOpen) {
      console.log('eroor')
    }

    return Linking.openURL(url);
  }
  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Alert',
      text2: 'Please fill all required fields'
    });
  }
  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Email sent Sucessfully'
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ScrollView contentInsetAdjustmentBehavior='automatic'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {/* <View style={{
          backgroundColor: Colors.primary,
          width: '100%',
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Sizes.radius,
          marginBottom: 16 * 2
        }}>
          <Text style={{
            fontSize: Sizes.largeTitle,
            color: Colors.white,
          }}>Contact us</Text>
        </View> */}
        <ImageBackground
          source={images.bg}
          resizeMode='cover'
          style={{
            width: '100%',
            height: Sizes.height / 2,
            alignItems: 'center',
          }} >
          <Text style={{
            color: Colors.black,
            fontSize: Sizes.h2
          }}>Contact us</Text>
        </ImageBackground>
        <FormInput
          labelValue={data.name}
          onChangeText={(val) => { validate_name(val) }}
          placeholderText="Name"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        >
          <Image
            source={icons.name}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.primary
            }}
          />
        </FormInput>
        {!data.valid_name && <Text style={styles.red}>
          This field is required
        </Text>}
        <FormInput
          labelValue={data['mail']}
          onChangeText={(userEmail) => { validate_mail(userEmail) }}
          placeholderText="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        >
          <Image
            source={icons.mail}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.primary
            }}
          />
        </FormInput>
        {!data.valid_mail &&
          <Text style={styles.red}>
            Please Enter valid mail
          </Text>
        }
        <FormInput
          labelValue={data['phone']}
          onChangeText={(userEmail) => { validate_phone(userEmail) }}
          placeholderText="Phone"
          keyboardType='numeric'
          autoCapitalize="none"
          autoCorrect={false}
        >
          <Image
            source={icons.phone}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.primary
            }}
          />
        </FormInput>
        {!data.valid_phone &&
          <Text style={styles.red}>
            Phone no. should be 10 digit
          </Text>
        }
        <View style={{
          borderWidth: 1,
          borderColor: '#ccc',
          width: '100%',
          height: 150,
          padding: 16,
          marginTop: 5,
          borderRadius: 3,
          marginBottom: 16,
        }}>
          <TextInput
            placeholder='Write your message here'
            placeholderTextColor={'#666'}
            labelValue={data['msg']}
            onChangeText={(val) => { validate_msg(val) }}
            multiline
            style={{
              color: '#333',
              fontSize: 16
            }}
          />
        </View>
        {!data.valid_msg &&
          <Text style={styles.red}>
            This field is required
          </Text>
        }
        <FormButton
          buttonTitle={'Send'}
          onPress={() => {
            if (data.valid_mail && data.valid_msg && data.valid_name && data.valid_phone) {
              send_email().then(() => {
                showToastSuccess()
                // console.log('Email sent sucessfully!')
              })
            } else {
              showToastError()
              // console.log('Please fill all reqd fields')
            }

          }}
        />

      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.padding
  },
  red: {
    color: 'red'
  }
});

export default App;
