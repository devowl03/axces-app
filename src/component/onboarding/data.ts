import {demoBuilding, Swiper2, Swiper3, Swiper4} from '../../constants/imgURL';

export interface swipeItemInterface {
  id: string;
  imgURL: string;
  title: string;
  description: string;
}

export const swiperData: swipeItemInterface[] = [
  {
    id: '1',
    imgURL: demoBuilding,
    title: 'Explore to turn your dreams into reality',
    description: 'Your all-in-one destination for housing solutions',
  },
  {
    id: '2',
    imgURL: Swiper2,
    title: 'Find, view and own your new home- in one step',
    description: 'Step into tomorrow by find your new home now',
  },
  {
    id: '3',
    imgURL: Swiper3,
    title: 'Home in sight, just a click away',
    description: 'Your perfect match is closer than you think; explore now',
  }
];
