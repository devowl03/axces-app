// Modals.tsx
import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {phoneIc, coinStack, greyRightArrow} from '../../constants/imgURL';
import Modal from 'react-native-modal';

interface ContactOwnerModalProps {
  visible: boolean;
  onClose: () => void;
  ownerDetails: {
    owner_name: string;
    contact_phone: string;
  } | null;
  onCallPress: () => void;
}

const ContactOwnerModal: React.FC<ContactOwnerModalProps> = ({
  visible,
  onClose,
  ownerDetails,
  onCallPress,
}) => {
  return (
    <Modal
      isOpen={visible}
      onClosed={onClose}
      style={{height: '50%', justifyContent: 'flex-end', borderRadius: 20}}
      backdropPressToClose={true}
      backButtonClose={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 items-center justify-center bg-black/80">
          <TouchableWithoutFeedback>
            <View className="rounded-lg p-4 bg-white w-[80%]">
              <Text className="text-black text-base font-bold">
                Congratulations!!!
              </Text>
              <Text className="text-[#34AF48]">Contact the owner now</Text>
              <View className="border border-black/10 rounded-lg p-3 my-3">
                {ownerDetails ? (
                  <>
                    <View className="flex flex-row">
                      <Image
                        source={{uri: phoneIc}}
                        resizeMode="contain"
                        className="w-10 h-10 rounded-full"
                      />
                      <View className="ml-3">
                        <Text className="text-[#7D7F88] text-sm font-medium">
                          Property Owner
                        </Text>
                        <Text className="text-[#1A1E25] text-base font-bold">
                          {ownerDetails.owner_name}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-[#0E0E0C] text-sm my-2">
                      Tap to call
                    </Text>
                    <TouchableOpacity
                      onPress={onCallPress}
                      className="py-3 px-4 flex flex-row items-center rounded-full bg-[#F2F8F6]">
                      <View className="flex-1 flex flex-row items-center">
                        <Image
                          source={{uri: phoneIc}}
                          resizeMode="contain"
                          className="w-4 h-4 mr-2"
                        />
                        <Text className="text-[#181A53] font-medium text-lg">
                          {ownerDetails.contact_phone}
                        </Text>
                      </View>
                      <Image
                        source={{uri: greyRightArrow}}
                        resizeMode="contain"
                        className="w-2 h-5 mr-2"
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text className="text-[#FF0000] text-base font-bold">
                    Owner details not available
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="w-full p-2 bg-[#BDEA09] rounded-full mt-2">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  Okay
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  message,
  onConfirm,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={onClose}
      >
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.bottomSheetContainer}>
        <View style={styles.handleBar} />

        {/* Bottom Sheet Content */}
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
          }}
          className="px-7">
          <View className="w-full flex flex-row items-start border-b border-b-black/10 pb-4">
            <View className="mr-4">
              <Image
                source={{uri: coinStack}}
                resizeMode="contain"
                className="w-10 h-10"
              />
            </View>
            <View className="flex-1 pr-6">
              <Text className="text-[#0E0E0C] text-lg font-bold">
                Do you want to contact the owner?
              </Text>
              <Text className="text-[#0E0E0C99] text-base">
                You will require 50 coins to view contact details .
              </Text>
            </View>
          </View>
          <View className="border-b border-b-black/10 py-4">
            <View className=" flex bg-[#F2F8F6] rounded-full flex-row justify-between items-center px-3 py-2">
              <Text className="text-[#181A53] text-lg">
                Available coins: <Text className="font-bold">50</Text>
              </Text>
              <TouchableOpacity
                className=" bg-[#BDEA09] rounded-full px-3 py-1"
                onPress={() => handlerechargeModalOpen()}>
                <Text className="text-[#181A53] text-base">+ Add coins</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className=" py-4 flex flex-row items-center">
            <TouchableOpacity
              onPress={() => setModalVisiblecontact(false)}
              // onPress={() => bottomSheetRef.current?.close()}
              className="flex-1 bg-[#F2F8F6] rounded-full p-3 mr-5">
              <Text className="text-[#181A53] text-base text-center font-medium">
                No take me back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAgree()}
              className="flex-1 bg-[#BDEA09] rounded-full p-3 ">
              <Text className="text-[#181A53] text-base text-center font-medium">
                Yes, I agree
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Export both modals
export {ContactOwnerModal, ConfirmationModal};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#181A53',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  handleBar: {
    width: 60,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  sheetTitle: {
    color: '#0E0E0C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheetSubtitle: {
    color: '#0E0E0C99',
    fontSize: 14,
  },
  coinInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F8F6',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  coinText: {
    color: '#181A53',
    fontSize: 16,
  },
  coinAmount: {
    fontWeight: 'bold',
  },
  addCoinButton: {
    backgroundColor: '#BDEA09',
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  addCoinText: {
    color: '#181A53',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F2F8F6',
    borderRadius: 50,
    padding: 12,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#181A53',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#BDEA09',
    borderRadius: 50,
    padding: 12,
  },
  confirmButtonText: {
    color: '#181A53',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});