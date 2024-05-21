import React from 'react';
import RecipeList from "../components/RecipeList";

const Home = (props) => {
    return (
        <div>
            {props.username ? 'Hi, ' + props.username : 'You are not logged in'}
            <RecipeList/>
        </div>
    );
};

export default Home;
