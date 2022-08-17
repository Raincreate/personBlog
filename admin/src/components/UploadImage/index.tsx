import React, { useEffect, useState } from 'react';
import Item from './item';

const UploadImage = (props) => {
  const {
    value,
    onChange,
    max,
    showImg = true,
    showLink = true,
    showIcon = false,
    showAction = true,
  } = props;
  interface IImage {
    _id?: string;
    imgUrl?: string;
    link?: string;
    icon?: string;
    showAdd?: boolean;
    showReduce?: boolean;
  }

  const initImgs: Array<IImage> = [
    {
      _id: '',
      imgUrl: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2Fd8f9d72a6059252d500d1c95e9f6bf315ab5b985.jpeg%3Ftoken%3Dd4f332bb06093bc090d2a515919dff4d&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1659546000&t=396bd7d834b8aba94d5ac47d09cce683',
      link: '',
      icon: '',
    },
  ];

  const [imgsArr, setImgsArr] = useState(() => {
    console.log('value', value);

    return value ? value : initImgs;
  });

  useEffect(() => {
    if (!value) {
      setImgsArr(initImgs);
    } else {
      const length = value.length;
      value.map((item, idx) => {
        if (length < max) {
          // 1 < 3
          item.showReduce = length != 1;
          item.showAdd = length - 1 === idx;
        } else {
          item.showReduce = true; //可以删除
          item.showAdd = false;
        }
      });
      setImgsArr(value);
    }
  }, [value]);

  const onItemChange = (data) => {
    console.log(data);
    imgsArr.forEach((item, index) => {
      if (index === data.index) {
        item[data.field] = data.value;
      }
    });
    onChange(imgsArr);
  };

  const onAdd = () => {
    if (imgsArr.length < max) {
      imgsArr.push({
        imgUrl: '',
        link: '',
        icon: '',
      });
      console.log(imgsArr);

      onChange(imgsArr);
    }
  };
  const onRemove = (index) => {
    if (imgsArr.length > 1) {
      imgsArr.splice(index, 1);
      onChange(imgsArr);
    }
  };
  return (
    <>
      {imgsArr?.map((item, index) => {
        return (
          <Item
            key={index}
            {...item}
            index={index}
            onChange={onItemChange}
            onAdd={onAdd}
            onRemove={onRemove}
            showImg={showImg}
            showLink={showLink}
            showIcon={showIcon}
            showAction={showAction}
          />
        );
      })}
    </>
  );
};

export default UploadImage;
