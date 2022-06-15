import React, { useState } from 'react';

const Home = () => {
    const [nweet, setNweet] = useState(""); //빈문자열
    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event; //event로 부터
        //즉, event 안에 있는 target안에 있는 value를 달라고 하는것
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind" maxLength={120} />
                <input type="submit" value="Nweet"/>
            </form>
        </div>
    );
};

export default Home;