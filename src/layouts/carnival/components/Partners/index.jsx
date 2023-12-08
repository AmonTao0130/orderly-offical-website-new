import React, { useState, useEffect } from 'react';
import './style.scss';
import img1 from '../../assets/partners/1.svg';
import img2 from '../../assets/partners/2.svg';
import img3 from '../../assets/partners/3.svg';
import img4 from '../../assets/partners/4.svg';
import img5 from '../../assets/partners/5.svg';
import img6 from '../../assets/partners/6.svg';
import img7 from '../../assets/partners/7.svg';
import img7a from '../../assets/partners/7a.svg';
import img8 from '../../assets/partners/8.svg';
import img9 from '../../assets/partners/9.svg';
import img10 from '../../assets/partners/10.svg';
import img11 from '../../assets/partners/11.svg';
import img12 from '../../assets/partners/12.svg';
import img13 from '../../assets/partners/13.svg';
import img14 from '../../assets/partners/14.svg';
import img14a from '../../assets/partners/14a.svg';
import img15 from '../../assets/partners/15.svg';
import img16 from '../../assets/partners/16.svg';
import img17 from '../../assets/partners/17.svg';
import img18 from '../../assets/partners/18.svg';
import img19 from '../../assets/partners/19.svg';
import img19a from '../../assets/partners/19a.svg';
import img20 from '../../assets/partners/20.svg';
import img21 from '../../assets/partners/21.svg';
import { cn } from "@/utils";

function createRows(images, numColumns) {
  const rows = [];
  for (let i = 0; i < images.length; i += numColumns) {
    rows.push(images.slice(i, i + numColumns));
  }
  return rows;
}

const images = [
  img1, img2, img3, img4, img5, img6, img7, img7a, img8, img9, img10,
  img11, img12, img13, img14, img14a, img15, img16, img17, img18, img19, img19a, img20, img21
];


function Partners() {

  // Define breakpoints for changing the number of columns
  const breakpoints = {
    small: 1,
    medium: 3,
    large: 6,
  };

  const calculateInitialColumns = () => {
    if (window.innerWidth <= 1220) {
      return breakpoints.medium;
    } else if (window.innerWidth <= 480) {
      return breakpoints.small;
    } else {
      return breakpoints.large;
    }
  };

  // Initialize the number of columns based on the current screen width
  const [numColumns, setNumColumns] = useState(calculateInitialColumns());

  // Update the number of columns when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1220) {
        setNumColumns(breakpoints.medium);
      } else if (window.innerWidth <= 480) {
        setNumColumns(breakpoints.small);
      } else {
        setNumColumns(breakpoints.large);
      }
    };

    // Attach the event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run this effect only once

  const rows = createRows(images, numColumns);

  const cellStyle = {
    display: "table-cell",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const rowStyle = {
    display: "table-row",
    height: "100px",
  };
  // <div className='Partners__content flex flex-wrap'>
  // {images.map((item, index) => (
  //   <div className={cn(
  //     'flex justify-center items-center',
  //     /** 375 */
  //     "m-[20px] ",
  //     /** 768 */
  //     "md:w-[calc((100%_-_120px)_/_3)] md:last:mr-[20px]",
  //     /** 1024 */
  //     "lg:w-[calc((100%_-_160px)_/_6)] last:mr-[calc((100%_-_160px)_/_6_+_100px)]"
  //     )} key={index} >
  //       <img src={item.src} />
  //     </div>
  //   ))}
  // </div>
  return (
    <section className="Partners container">
      <h2>Partners</h2>     
      <div className="Partners__content" style={{ display: "table" }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={rowStyle}>
            {row.map((item, colIndex) => (
              <div key={colIndex} style={cellStyle}>
                <img src={item.src} alt={`Partner ${rowIndex * numColumns + colIndex + 1}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Partners;
