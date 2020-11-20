import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

interface PhotosProp {
  src: string;
  author: string;
  caption?: string;
  time?: string;
  location?: string;
  thumbnail?: string;
  alt?: string;
}

interface Props {
  photos: PhotosProp[];
  label: string;
  isHorizontal: boolean;
  labelWidth?: number;
  name: string;
}

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];

  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }

  return classes.join(' ');
};

const ImageDetail = ({
  image,
  isShow,
  onHide,
}: {
  image: PhotosProp;
  isShow: boolean;
  onHide: () => void;
}) => {
  return (
    <Modal size="sm" show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <img src={image.src} alt={image.alt ? image.alt : ''} width="100%" />
      <div className="mt-5 pl-5">
        <p>Người chụp: {image.author}</p>
        <p>Thời gian: {image.time && image.time}</p>
        <p>Địa điểm: {image.location && image.location}</p>
      </div>
    </Modal>
  );
};

function ImgGallery({ photos, label, isHorizontal = false, labelWidth, name }: Props) {
  const [_isShow, setShow] = useState<boolean>(false);
  const [_currentImage, setCurrentImage] = useState<PhotosProp>({
    src: '',
    author: '',
  });

  const hideModal = () => {
    setShow(false);
  };

  const handleClickImage = (values: PhotosProp) => {
    setCurrentImage(values);
    setShow(true);
  };

  return (
    <>
      <ImageDetail image={_currentImage} isShow={_isShow} onHide={hideModal} />

      <div className={isHorizontal ? 'row' : ''}>
        <div className={isHorizontal ? getClassName(labelWidth, true) : ''}>
          {label && <label className={isHorizontal ? 'mb-0 input-label mt-2' : ''}>{label}</label>}
        </div>

        <div className={isHorizontal ? getClassName(labelWidth, false) : ''}>
          {photos.map((value: PhotosProp, key: number) => (
            <React.Fragment key={key}>
              <img
                src={value.src}
                alt={value.alt ? value.alt : ''}
                width="150px"
                onClick={() => handleClickImage(value)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImgGallery;
