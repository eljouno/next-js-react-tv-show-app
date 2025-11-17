"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { TvShowListCard } from '../TvShowListCard/TvShowListCard';
import "./tv-show-list.scss";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/**
 * TvShowList Component
 *
 * Displays a responsive carousel of TV shows using Swiper.
 * Supports both callback-based selection and link-based navigation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.shows - Array of TV show objects from TMDB API
 * @param {Function} [props.onClickItem] - Callback when card is clicked (optional)
 *
 * @returns {JSX.Element} Swiper carousel with TV show cards
 */
export const TvShowList = ({ shows, onClickItem }) => {
  return (
    <Swiper
      className="tv-show-list"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      breakpoints={{
        400: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
    >
      {shows.map((show) => (
        <SwiperSlide key={show.id}>
          <TvShowListCard tvShow={show} onClickItem={onClickItem} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
