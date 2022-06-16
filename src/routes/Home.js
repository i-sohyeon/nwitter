import React, { useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState(""); //빈문자열
    const onSubmit = async(event) => {

        // TEST02 CODE
        event.preventDefault();
        console.log(`submit nweet:${nweet}`);
        await addDoc(collection(dbService,"nweets"),{
            nweet,
            createdAt:serverTimestamp(),
        });
        setNweet("");

        // ===================================================

        //TEST01 CODE
        // event.preventDefault();
        // try{
        //     const docRef = await addDoc(collection(dbService,"nweeets"),{
        //         nweet,
        //         createdAt : Date.now(),
        //     });
        //     console.log("Document written with ID:", docRef.id);
        // }catch (error) {
        //     console.error("Error adding document:", error);
        // }

        // setNweet("");

        // ===================================================

        // 노마드 코드
        // await dbService.collection("neweets").add({
        //     //원하는 데이터를 무엇이든 넣을 수 있음
        //     nweet,
        //     createdAt : Date.now(),
        // });
        // //submit하고나면, setNweet()을 해서 빈문자열 적용하기
        // setNweet("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event; //event로 부터
        //즉, event 안에 있는 target안에 있는 value를 달라고 하는것
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind"
                    maxLength={120}
                />
                <input type="submit" value="Nweet"/>
            </form>
        </div>
    );
};

export default Home;