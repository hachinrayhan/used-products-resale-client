import React from 'react';
import Advertise from './Advertise';
import ConnectWithUs from './ConnectWithUs';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Advertise></Advertise>
            <ConnectWithUs></ConnectWithUs>
        </div>
    );
};

export default Home;