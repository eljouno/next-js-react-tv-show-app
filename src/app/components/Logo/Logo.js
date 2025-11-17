import Image from 'next/image';
import './logo.scss';

/**
 * Logo Component
 *
 * Displays a logo with title and subtitle. Uses Next.js Image component
 * for optimized image loading and rendering.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string|Object} props.img - Image source (URL string or Next.js image import object)
 * @param {string} props.title - Main title text displayed next to the logo
 * @param {string} props.subtitle - Subtitle text displayed below the header
 *
 * @returns {JSX.Element} Logo component with image, title and subtitle
 */
export const Logo = ({img, title, subtitle}) => {
  return (
    <div className="logo">
      {/* Logo header containing image and title */}
      <div className="logo__header">
        <Image
          className="logo__image"
          src={img}
          alt={title}
          width={40}
        />
        <h1 className="logo__title fs-22">{title}</h1>
      </div>
      
      {/* Logo subtitle */}
      <div className="logo__subtitle cmt-5">
        {subtitle}
      </div>
    </div>
  );
}
