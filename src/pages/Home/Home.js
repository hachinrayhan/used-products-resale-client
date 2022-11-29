import React from 'react';
import Advertise from './Advertise';
import Categories from './Categories';
import ConnectWithUs from './ConnectWithUs';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <Advertise></Advertise>
            <ConnectWithUs></ConnectWithUs>
        </div>
    );
};

export default Home;