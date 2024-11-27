
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Modal from 'react-native-modalbox';
import { RectButton } from 'react-native-gesture-handler';
import Loader from '../Loader/Loader';

const ImagePicker = (props: any) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<Modal>(null);

  const openPicker = async (camera = false, multiple = false) => {
    setLoading(true); // Start the loader


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

    // await requestMultiple([
    //   PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    //   PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    //   PERMISSIONS.ANDROID.CAMERA,
    // ]);

    const config = {
      mediaType: 'photo',
      multiple,
    };

    let result = null;
    try {
      if (camera) {
        result = await launchCamera(config);
      } else {
        result = await launchImageLibrary(config);
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
        modalRef.current?.close(); // Close the modal after image selection
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const removeImage = (uri: string) => {
    const filteredImages = images.filter(image => image.uri !== uri);
    setImages(filteredImages);
    props.onSaveImage(filteredImages);
  };

  const {
    isOpen,
    onClose,
    title,
    multiple,
  } = props;

  const options = [
    {
      title: 'Gallery',
      icon: require("../../../assets/image-gallery.png"),
      onPress: () => openPicker(false, multiple),
    },
    {
      title: 'Camera',
      icon: require("../../../assets/photo-camera.png"),
      onPress: () => openPicker(true, multiple),
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
            <RectButton
              onPress={el.onPress}
              key={i}
              style={styles.option}>
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
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
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


