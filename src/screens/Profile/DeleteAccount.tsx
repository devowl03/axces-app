import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import CenterHeader from '../../component/Header/CenterHeader';
import {deleteAccessToken, getAccessToken} from '../../utils';
import FlashMessage from 'react-native-flash-message';

const DeleteAccountScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [feedback, setFeedback] = useState('');

  const reasons = [
    'Not finding relevant properties',
    'Found a better alternative',
    'Privacy concerns',
    'Other reasons',
  ];

  const handleDeleteAccount = async () => {
    if (!selectedReason) {
      Alert.alert('Error', 'Please select a reason for deleting your account');
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                navigation.goBack();
              }, 2000);
            } catch (error) {
              console.error('Delete account error:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />

      <CenterHeader title="Delete Account" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.reasonTitle}>
            Please select a reason for leaving:
          </Text>

          <View style={styles.reasonsContainer}>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.reasonButton,
                  selectedReason === reason && styles.selectedReasonButton,
                ]}
                onPress={() => setSelectedReason(reason)}>
                <Text
                  style={[
                    styles.reasonButtonText,
                    selectedReason === reason &&
                      styles.selectedReasonButtonText,
                  ]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackLabel}>
              Additional feedback (optional)
            </Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Tell us more about your experience..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>

          <Text style={styles.warningTextSmall}>
            {/* say after success your data will be delted from server with 7 days if want to cancel the request then reachout to contact */}
            Your data will be deleted from the server within 7 days. If you wish
            to cancel the request, please reach out to our support team.
          </Text>

          <TouchableOpacity
            style={[styles.deleteButton, loading && styles.disabledButton]}
            onPress={handleDeleteAccount}
            disabled={loading}>
            <Text style={styles.deleteButtonText}>
              {loading ? 'Deleting...' : 'Delete Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A53',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  warningText: {
    fontSize: RFValue(16),
    color: '#181A53',
    marginBottom: 15,
    fontWeight: '500',
  },
  reasonTitle: {
    fontSize: RFValue(16),
    color: '#181A53',
    marginBottom: 15,
    fontWeight: '500',
  },
  reasonsContainer: {
    marginBottom: 20,
  },
  reasonButton: {
    backgroundColor: '#F2F8F6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F2F8F6',
  },
  selectedReasonButton: {
    backgroundColor: '#181A53',
    borderColor: '#181A53',
  },
  reasonButtonText: {
    color: '#181A53',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  selectedReasonButtonText: {
    color: '#FFFFFF',
  },
  feedbackContainer: {
    marginBottom: 30,
  },
  feedbackLabel: {
    fontSize: RFValue(14),
    color: '#181A53',
    marginBottom: 10,
  },
  feedbackInput: {
    backgroundColor: '#F2F8F6',
    borderRadius: 12,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    fontSize: RFValue(14),
    color: '#181A53',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F2F8F6',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#181A53',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  warningTextSmall: {
    fontSize: RFValue(12),
    color: 'red',
    marginBottom: 20,
    lineHeight: 20,
  },
});

export default DeleteAccountScreen;
