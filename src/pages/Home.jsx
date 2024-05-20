import React from 'react';

const Home = (props) => {
    return (
        <div>
            {props.username ? 'Hi, ' + props.username : 'You are not logged in'}
        </div>
    );
};

export default Home;
