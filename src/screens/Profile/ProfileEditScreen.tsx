// // import {
// //   Image,
// //   Keyboard,
// //   ScrollView,
// //   StatusBar,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import UserCoin from '../../component/Profile/UserCoin';
// // import Header from '../../component/Header/Header';
// // import {SafeAreaView} from 'react-native-safe-area-context';
// // import {defaultUserIc, whiteHome} from '../../constants/imgURL';
// // import EditTile from './component/EditTile';
// // import { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { onEditProfile } from '../../redux/ducks/Auth/editProfile';
// // import { useAppSelector } from '../../constants';
// // import { errorMessage, successMessage } from '../../utils';
// // import Loader from '../../component/Loader/Loader';

// // const ProfileEditScreen = () => {
// //   const [editName, setEditName] = useState('');
// //   const [editMail, setEditMail] = useState('');
// //   const [editNumber, setEditNumber] = useState('');
// //   const [loading, setLoading] = useState(false);


// //   const editProfile = useAppSelector(state => state.editProfile)
// //   const viewProfile = useAppSelector((state) => state.viewProfile)

// //   const dispatch = useDispatch()

// //   useEffect(() => {
// //     if (editProfile.called) {
// //       setLoading(false)
// //       const {message, code} = editProfile
// //       if (code === 200){
// //         successMessage(message)
// //       }
// //       else {
// //         errorMessage(message)
// //       }
// //     }
// //     if (viewProfile.called) {
// //       const { message, code, data} = viewProfile?.data;
// //       setLoading(false);
// //       if (code === 200) {
// //         console.log("view profile", data)
// //         successMessage(message);
// //         setEditMail(data?.email);
// //         setEditName(data?.name);
// //         setEditNumber(data?.number?.toString());
// //       } else {
// //         errorMessage(message);
// //       }
// //     }
// //   }, [editProfile, viewProfile])

// //   return (
// //     <SafeAreaView className="flex-1 bg-[#F2F8F6] relative">
// //       <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
// //       <Header centerTile={true} title="Profile" RightComp={UserCoin} />
// //       <Loader loading={loading}/>
// //       <ScrollView className="flex-1">
// //         <View className="bg-[#181A53] px-6 py-6 ">
// //           <View className=" w-full flex  items-center justify-center">
// //             <View className=" w-24 h-24 rounded-full">
// //               <Image
// //                 source={{uri: defaultUserIc}}
// //                 resizeMode="contain"
// //                 className=" w-full h-full"
// //               />
// //             </View>
// //             <View className=" flex items-center justify-center mt-1">
// //               <Text className="text-white font-bold text-2xl">{editName}</Text>
// //               <Text className="text-white text-base my-1">+91 {editNumber}</Text>
// //             </View>
// //           </View>
// //         </View>
// //         <View className=" flex-1 px-6">
// //           <EditTile onChangeText={(value: string) => setEditName(value)} type="Your name" value={editName} editable={true} />
// //           <EditTile
// //             type="E-mail"
// //             value={editMail}
// //             onChangeText={(value: string) => setEditMail(value)}
// //             editable={true}
// //           />
// //           <EditTile type="Mobile Number" value={editNumber} onChangeText={(value: string) => setEditNumber(value)} editable={true} />
// //         </View>

// //         {/* bottom placeholder */}
// //         <View className="w-full h-[10vh]" />
// //       </ScrollView>
// //       <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
// //           <TouchableOpacity
// //             onPress={() => {dispatch(onEditProfile(editName, editMail)); setLoading(true); Keyboard.dismiss()}}
// //             className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
// //             <Text className="text-[#181A53] text-base font-medium text-center">
// //               Save
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default ProfileEditScreen;


// import {
//   Image,
//   Keyboard,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import UserCoin from '../../component/Profile/UserCoin';
// import Header from '../../component/Header/Header';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import EditTile from './component/EditTile';
// import {useEffect, useState} from 'react';
// import {useDispatch} from 'react-redux';
// import {onEditProfile} from '../../redux/ducks/Auth/editProfile';
// import {useAppSelector} from '../../constants';
// import {errorMessage, getAccessToken, successMessage} from '../../utils';
// import Loader from '../../component/Loader/Loader';
// import {defaultUserIc, whiteHome} from '../../constants/imgURL';
// import {PermissionsAndroid, Platform} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { onGetBalance } from '../../redux/ducks/Coins/getBalance';

// const ProfileEditScreen = () => {
//   const [editName, setEditName] = useState('');
//   const [editMail, setEditMail] = useState('');
//   const [editNumber, setEditNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [profilePic, setProfilePic] = useState(null); // Profile pic URI

//   const editProfile = useAppSelector(state => state.editProfile);
//   const viewProfile = useAppSelector(state => state.viewProfile);
  

//   const dispatch = useDispatch();

//   useEffect(()=>{
//      dispatch(onGetBalance());
//   },[])

//   useEffect(() => {
//     if (editProfile.called) {
//       setLoading(false);
//       const {message, code} = editProfile;
//       if (code === 200) {
//         successMessage(message);
//       } else {
//         errorMessage(message);
//       }
//     }
//     if (viewProfile.called) {
//       const {message, code, data} = viewProfile?.data;
//       setLoading(false);
//       if (code === 200) {
//         successMessage(message);
//         setEditMail(data?.email);
//         setEditName(data?.name);
//         setEditNumber(data?.number?.toString());
//         setProfilePic(data?.profilePicture || null); // Set profile pic from API
//       } else {
//         errorMessage(message);
//       }
//     }
//   }, [editProfile, viewProfile]);

//   // Function to select image using react-native-image-picker
//   const chooseImage = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//     };
//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const selectedImage = response.assets[0].uri; // Get the image URI
//         setProfilePic(selectedImage); // Set profile image URI in state
//       }
//     });
//   };


//   const handleProfileUpdate = async () => {
//     const formData = new FormData();
//     formData.append('name', editName);
//     formData.append('email', editMail);
//     formData.append('phone', editNumber);

//     // Add the image file to the formData
//     if (profilePic) {
//       const filename = profilePic?.split('/').pop();
//       const fileType = filename?.split('.').pop();

//       formData.append('profilePicture', {
//         uri: profilePic,
//         name: filename,
//         type: `image/${fileType}`, // Ensure correct type like 'image/jpeg' or 'image/png'
//       });
//     }

//     try {
//       setLoading(true);

//        const token = await getAccessToken();
//        console.log('userId', token);

//       // Make the API call to upload the profile pic and other data
//       const response = await fetch('https://backend.axces.in/api/profile-pic', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token} `,
//           // You can add any additional headers like authentication tokens here if needed
//         },
//       });

//       const result = await response.json();

//       setLoading(false);

//       // Handle the response from the API
//       if (response.ok) {
//         successMessage(result.message || 'Profile updated successfully!');
//       } else {
//         errorMessage(result.message || 'Failed to update profile.');
//       }
//     } catch (error) {
//       setLoading(false);
//       errorMessage('An error occurred. Please try again.');
//       console.error('Error while uploading profile:', error);
//     }

//     Keyboard.dismiss();
//   };


//   // Function to create FormData and upload the profile picture
//   // const handleProfileUpdate = () => {
//   //   const formData = new FormData();
//   //   formData.append('name', editName);
//   //   formData.append('email', editMail);
//   //   formData.append('phone', editNumber);

//   //   // Add the image file to the formData
//   //   if (profilePic) {
//   //     const filename = profilePic.split('/').pop();
//   //     const fileType = filename.split('.').pop();

//   //     formData.append('profile_pic', {
//   //       uri: profilePic,
//   //       name: filename,
//   //       type: `image/${fileType}`, // You can use 'image/jpeg', 'image/png', etc.
//   //     });
//   //   }

//   //   // Dispatch the action to update the profile and upload the image
//   //   dispatch(onEditProfile(formData));
//   //   setLoading(true);
//   //   Keyboard.dismiss();
//   // };

//   return (
//     <SafeAreaView className="flex-1 bg-[#181A53] relative">
//       <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//       <Header centerTile={true} title="Profile" RightComp={UserCoin} />
//       <Loader loading={loading} />
//       <ScrollView className="flex-1 bg-[#F2F8F6]">
//         <View className="bg-[#181A53] px-6 py-6">
//           <View className="w-full flex items-center justify-center">
//             <TouchableOpacity
//               onPress={chooseImage}
//               style={{position: 'relative'}}>
//               <View className="w-24 h-24 rounded-full">
//                 <Image
//                   source={{uri: profilePic || defaultUserIc}} // Display selected profile picture
//                   resizeMode="cover"
//                   className="w-full h-full"
//                   style={{borderRadius: 50}}
//                 />
//                 {/* Pen icon for editing */}
//                 <View style={{position: 'absolute', bottom: 0, right: 0}}>
//                   <Icon name="pencil" size={20} color="#BDEA09" />
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <View className="flex items-center justify-center mt-1">
//               <Text className="text-white font-bold text-2xl">{editName}</Text>
//               <Text className="text-white text-base my-1">
//                 +91 {editNumber}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View className="flex-1 px-6">
//           <EditTile
//             onChangeText={(value: string) => setEditName(value)}
//             type="Your name"
//             value={editName}
//             editable={true}
//           />
//           <EditTile
//             type="E-mail"
//             value={editMail}
//             onChangeText={(value: string) => setEditMail(value)}
//             editable={true}
//           />
//           <EditTile
//             type="Mobile Number"
//             value={editNumber}
//             onChangeText={(value: string) => setEditNumber(value)}
//             editable={false}
//           />
//         </View>

//         {/* bottom placeholder */}
//         {/* <View className="w-full h-[10vh]" /> */}
//       </ScrollView>
//       <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
//         <TouchableOpacity
//           onPress={handleProfileUpdate}
//           className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
//           <Text className="text-[#181A53] text-base font-medium text-center">
//             Save
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileEditScreen;


import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import UserCoin from '../../component/Profile/UserCoin';
import Header from '../../component/Header/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import EditTile from './component/EditTile';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onEditProfile} from '../../redux/ducks/Auth/editProfile'; // For email & name
import {useAppSelector} from '../../constants';
import {errorMessage, getAccessToken, successMessage} from '../../utils';
import Loader from '../../component/Loader/Loader';
import {defaultUserIc} from '../../constants/imgURL';
import {PermissionsAndroid, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {onGetBalance} from '../../redux/ducks/Coins/getBalance';

const ProfileEditScreen = () => {
  const [editName, setEditName] = useState('');
  const [editMail, setEditMail] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // Profile pic URI
  const [initialProfilePic, setInitialProfilePic] = useState(null); // For detecting changes in profile pic

  const editProfile = useAppSelector(state => state.editProfile);
  const viewProfile = useAppSelector(state => state.viewProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetBalance());
  }, []);

  useEffect(() => {
    if (editProfile.called) {
      setLoading(false);
      const {message, code} = editProfile;
      if (code === 200) {
        successMessage(message);
      } else {
        errorMessage(message);
      }
    }
    if (viewProfile.called) {
      const {message, code, data} = viewProfile?.data;

      setLoading(false);
      if (code === 200) {
        successMessage(message);
        setEditMail(data?.email);
        setEditName(data?.name);
        setEditNumber(data?.number?.toString());
        setProfilePic(data?.profilePicture || null); // Set profile pic from API
        setInitialProfilePic(data?.profilePicture || null); // Keep the initial value to detect changes
      } else {
        errorMessage(message);
      }
    }
  }, [editProfile, viewProfile]);

  // Function to select image using react-native-image-picker
  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0].uri; // Get the image URI
        setProfilePic(selectedImage); // Set profile image URI in state
      }
    });
  };

  // Validate the email before sending
  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    let profileUpdated = false;

    // Validate email format
    if (!validateEmail(editMail)) {
      errorMessage('Please enter a valid email address.');
      return;
    }

     if (!editName) {
       errorMessage('Please enter a name');
       return;
     }

    // Handle profile pic update if changed
    if (profilePic !== initialProfilePic) {
      profileUpdated = await handleProfilePicUpdate();
    }

    // Handle name/email update
    if (editName || editMail) {
      handleNameEmailUpdate();
    }

    Keyboard.dismiss();
  };

  // Function to handle name/email update
  const handleNameEmailUpdate = () => {
    const payload = {
      name: editName,
      email: editMail,
      phone: editNumber,
    };
    console.log('====================================');
    console.log('payload', payload);
    console.log('====================================');
    setLoading(true);
    dispatch(onEditProfile(editName, editMail))
    // dispatch(onEditProfile(payload));
  };

  // Function to handle profile picture update
  const handleProfilePicUpdate = async () => {
    if (!profilePic) {
      errorMessage('Please select a valid profile picture.');
      return false;
    }

    const formData = new FormData();
    const filename = profilePic?.split('/').pop();
    const fileType = filename?.split('.').pop();

    formData.append('profilePicture', {
      uri: profilePic,
      name: filename,
      type: `image/${fileType}`, // Ensure correct type like 'image/jpeg' or 'image/png'
    });

    console.log('Profile Pic FormData being sent:');
    // formData.forEach((value, key) => {
    //   console.log(key, value); // Log FormData to verify the structure
    // });

    try {
      setLoading(true);
      const token = await getAccessToken();

      const response = await fetch('https://backend.axces.in/api/profile-pic', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('API Response for Profile Pic:', result); // Full response
      console.log('Response Status Code:', response.status); // Log the status code

      setLoading(false);

      // Handle the response from the API
      if (response.ok) {
        successMessage(
          result.message || 'Profile picture updated successfully!',
        );
        return true;
      } else {
        errorMessage(result.message || 'Failed to update profile picture.');
        return false;
      }
    } catch (error) {
      setLoading(false);
      errorMessage(
        'An error occurred while uploading profile picture. Please try again.',
      );
      console.error('Error while uploading profile:', error);
      return false;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#181A53] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="Profile" RightComp={UserCoin} />
      <Loader loading={loading} />
      <ScrollView className="flex-1 bg-[#F2F8F6]">
        <View className="bg-[#181A53] px-6 py-6">
          <View className="w-full flex items-center justify-center">
            <TouchableOpacity
              onPress={chooseImage}
              style={{position: 'relative'}}>
              <View className="w-24 h-24 rounded-full">
                <Image
                  source={{uri: profilePic || defaultUserIc}} // Display selected profile picture
                  resizeMode="cover"
                  className="w-full h-full"
                  style={{borderRadius: 50}}
                />
                {/* Pen icon for editing */}
                <View style={{position: 'absolute', bottom: 0, right: 0}}>
                  <Icon name="pencil" size={20} color="#BDEA09" />
                </View>
              </View>
            </TouchableOpacity>
            <View className="flex items-center justify-center mt-1">
              <Text className="text-white font-bold text-2xl">{editName}</Text>
              <Text className="text-white text-base my-1">
                +91 {editNumber}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 px-6">
          <EditTile
            onChangeText={(value: string) => setEditName(value)}
            type="Your name"
            value={editName}
            editable={true}
          />
          <EditTile
            type="E-mail"
            value={editMail}
            onChangeText={(value: string) => setEditMail(value)}
            editable={true}
          />
          <EditTile
            type="Mobile Number"
            value={editNumber}
            onChangeText={(value: string) => setEditNumber(value)}
            editable={false}
          />
        </View>
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
        <TouchableOpacity
          onPress={handleProfileUpdate}
          className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
          <Text className="text-[#181A53] text-base font-medium text-center">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
