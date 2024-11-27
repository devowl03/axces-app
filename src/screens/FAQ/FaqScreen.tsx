import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {faqChatBot} from '../../constants/imgURL';
import FaqTile from './component/FaqTitle';
import {useState} from 'react';

interface faqData {
  title: string;
  description: string;
}

const faqs: faqData[] = [
  {
    title: 'How can I list my property for rent or sale?',
    description:
      'Once logged in, go to the "List Property" section. Enter details about the property, including photos, description, price, and location. Review and submit the listing.',
  },
  {
    title: 'How do I search for properties?',
    description:
      'Use the search bar on the home screen or navigate to the "Search" section. Enter your desired location, property type, and other filters to narrow down your results.',
  },
  {
    title: 'How can I contact the property owner or agent?',
    description:
      'On the property listing page, look for the "Contact Owner" button. Please view the contact details after paying the required coins.',
  },
  {
    title: 'Can I save my favorite properties?',
    description:
      'Yes, you can save properties by clicking the "Heart" or "Wishlist" icon on the listing page. Saved properties will be accessible in the wishlist section.',
  },
  {
    title: 'How do I manage my property listings?',
    description:
      'Go to your profile or the "My Listings" section to view and manage your properties. You can edit details, update status, or remove listings from there.',
  },
  {
    title: 'Are there any fees associated with using the app?',
    description:
      'Basic features are typically free, but there will be fees for viewing contact details of the property owner. Please check the app’s terms of service for detailed information.',
  },
  {
    title: 'How do I report a problem with a listing?',
    description:
      'If you encounter any issues with a listing, find the "Ask Query" option on the home page. Provide details about the problem, and the support team will review and address the issue.',
  },
  {
    title: 'How do I provide feedback/suggestion?',
    description:
      'We welcome all feedback and suggestion, find the "Ask Query" option on the home page. Provide feedback/suggestion, and the support team will review the same.',
  },
];

const FaqScreen = () => {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // Toggle individual FAQ or toggle "See all"
  const toggleFaq = (id: number | 'ALL') => {
    if (id === 'ALL') {
      setOpenFaqs(
        openFaqs.length === faqs.length ? [] : faqs.map((_, idx) => idx),
      );
    } else {
      setOpenFaqs(prevState => {
        if (prevState.length === faqs.length) {
          // If all are open, only close the clicked one
          return faqs.map((_, idx) => idx).filter(idx => idx !== id);
        }
        // Toggle the clicked FAQ
        return prevState.includes(id)
          ? prevState.filter(faqId => faqId !== id)
          : [...prevState, id];
      });
    }
  };

  const handlehelpEmail = () => {
    const email = 'axces.customercare@gmail.com';
    const url = `mailto:${email}?subject=Subject #issue related to app&body=${encodeURIComponent(
      'Hello, I need support with...',
    )}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open email link: ', err),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#181A53]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="FAQ" />
      <View className="flex-1 relative">
        <ScrollView className="flex-1" style={{backgroundColor: '#fff'}}>
          <View className="w-full flex flex-row items-center justify-center bg-[#181A53] px-6 py-3">
            <Image
              source={{uri: faqChatBot}}
              resizeMode="contain"
              className=" w-28 h-28 mr-3 "
            />
            <View className=" flex-1">
              <Text className=" text-xl text-white font-bold">FAQs</Text>
              <Text className=" text-sm text-white/50">
                Unlock insights with our user-friendly FAQ guide
              </Text>
            </View>
          </View>

          {/* question answer section */}
          <View className="flex-1 px-6 relative">
            <View className="z-20 w-full rounded-2xl p-4 bg-white shadow-md">
              <View className=" flex flex-row justify-between items-center">
                <Text className=" text-[#0E0E0C] text-lg font-bold">
                  Frequent Questions
                </Text>
                <TouchableOpacity onPress={() => toggleFaq('ALL')}>
                  <Text className=" text-[#BDEA09] text-sm">
                    {openFaqs.length === faqs.length ? 'Close all' : 'See all'}
                  </Text>
                </TouchableOpacity>
              </View>

              {faqs.map((faq, idx) => (
                <FaqTile
                  key={idx}
                  checker={openFaqs.includes(idx)}
                  id={idx}
                  title={faq.title}
                  description={faq.description}
                  faqClickHandler={() => toggleFaq(idx)}
                />
              ))}
            </View>
            <View className="z-10 absolute top-0 left-0 right-0 h-20 bg-[#181A53]" />
          </View>
          <View className="w-full h-24" />
        </ScrollView>
        <View className="bottom-0 left-0 right-0 h-20 bg-white z-30 absolute px-6 py-4 flex flex-row items-center justify-between">
          <Text className=" text-sm text-[#0E0E0C]/60 w-[40%] mr-6">
            Didn’t get your answer
          </Text>
          <TouchableOpacity
            className=" p-3 rounded-full bg-[#BDEA09] flex-1"
            onPress={handlehelpEmail}>
            <Text className=" text-[#181A53] text-base font-bold text-center">
              Ask Query
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;
