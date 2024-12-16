import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Modal from 'react-native-modalbox';
import {RectButton} from 'react-native-gesture-handler';
import Loader from '../Loader/Loader';

const ImagePicker = (props: any) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<Modal>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.CAMERA,
      ]);
    } else if (Platform.OS === 'ios') {
      await requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
    }
  };

const openPicker = async (camera = false) => {
  setLoading(true); // Start the loader

  // Request permissions
  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

  await requestMultiple(permissions);

  const config = {
    mediaType: 'photo', // Only photos
    cameraType: 'back', // Back camera
    quality: 0.8, // Adjust quality
    saveToPhotos: true, // Save to Photos library
  };

  let result = null;
  try {
    if (camera) {
      console.log('Opening camera...');
      result = await launchCamera(config);
      console.log('Camera opened successfully.');
    } else {
      console.log('Opening gallery...');
      result = await launchImageLibrary(config);
      console.log('Gallery opened successfully.');
    }

    if (result?.assets) {
      const newImages = result.assets.map(asset => ({
        name: asset.fileName,
        size: asset.fileSize,
        type: asset.type,
        uri: asset.uri,
      }));
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      props.onSaveImage(updatedImages);
      modalRef.current?.close();
    }
  } catch (error) {
    console.error('Error opening picker:', error);
  } finally {
    setLoading(false);
  }
};


  const removeImage = (uri: string) => {
    const filteredImages = images.filter(image => image.uri !== uri);
    setImages(filteredImages);
    props.onSaveImage(filteredImages);
  };

  const {isOpen, onClose, title} = props;

  const options = [
    {
      title: 'Gallery',
      icon: require('../../../assets/image-gallery.png'),
      onPress: () => openPicker(false), // Open Gallery
    },
    {
      title: 'Camera',
      icon: require('../../../assets/photo-camera.png'),
      onPress: () => openPicker(true), // Open Camera
    },
  ];

  return (
    <Modal
      backButtonClose={true}
      ref={modalRef}
      swipeToClose={false}
      backdrop={true}
      position="bottom"
      isOpen={isOpen}
      onClosed={onClose}
      style={styles.container}>
      <View style={styles.dialog}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          {options.map((el, i) => (
            console.log("el",el)
            ,
            <RectButton onPress={el.onPress} key={i} style={styles.option}>
              <View style={styles.icon}>
                <Image source={el.icon} style={styles.optionIcon} />
              </View>
              <Text style={styles.optionText}>{el.title}</Text>
            </RectButton>
          ))}
        </View>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <Loader loading={loading} />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%',
    backgroundColor: 'white',
  },
  dialog: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    padding: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  option: {
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  optionIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  optionText: {
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color:'black'
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ImagePicker;
