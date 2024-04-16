import {
  Image,
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
    title: 'What is a referral?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'How many people can i refer?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'What is a referral?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'How many people can i refer?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'What is a referral?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'How many people can i refer?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'What is a referral?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
  {
    title: 'How many people can i refer?',
    description:
      'Go to rewards section from the homescreen and click on the type of rewards and then claim your reward to make it yours.',
  },
];

const FaqScreen = () => {
  const [faqSelect, setFaqSelect] = useState<number | 'ALL' | 'NONE'>('NONE');

  const faqHandler = (titleId: number) => {
    if (titleId === faqSelect) {
      setFaqSelect('NONE');
    } else if (titleId !== faqSelect) {
      setFaqSelect(titleId);
    }
  };

  const seeAllHandler = () => {
    if (faqSelect === 'ALL') {
      setFaqSelect('NONE');
    } else {
      setFaqSelect('ALL');
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="FAQ" />
      <View className="flex-1 relative">
        <ScrollView className="flex-1">
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
                <TouchableOpacity onPress={seeAllHandler}>
                  <Text className=" text-[#BDEA09] text-sm">See all</Text>
                </TouchableOpacity>
              </View>

              {faqs.map((faq, idx) => (
                <FaqTile
                  checker={faqSelect}
                  id={idx}
                  key={idx}
                  title={faq.title}
                  description={faq.description}
                  faqClickHandler={faqHandler}
                />
              ))}
            </View>
            <View className="z-10 absolute top-0 left-0 right-0 h-20 bg-[#181A53]" />
          </View>
          <View className="w-full h-24" />
        </ScrollView>
        <View className="bottom-0 left-0 right-0 h-20 bg-white z-30 absolute px-6 py-4 flex flex-row items-center justify-between">
          <Text className=" text-sm text-[#0E0E0C]/60 w-[40%] mr-6">
            Didn’t get your answer. Ask your query here
          </Text>
          <TouchableOpacity className=" p-3 rounded-full bg-[#BDEA09] flex-1">
            <Text className=" text-[#181A53] text-base font-normal text-center">
              Ask Query
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;
