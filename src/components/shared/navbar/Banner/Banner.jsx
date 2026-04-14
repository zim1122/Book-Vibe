import React from 'react';
import bookImage from '../../../../assets/hero_img.jpg'

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-[70vh] rounded-2xl my-8 container mx-auto">
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <img
      src={bookImage}
    />
    <div>
      <h1 className="text-5xl font-bold">Books to freshen  up <br></br> your bookshelf</h1>
      <button className="btn btn-success mt-4 text-white">View the list</button>
    </div>
  </div>
</div>
    );
};

export default Banner;