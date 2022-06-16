import { dbService } from 'fbase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const[nweet, setNweet] = useState("");
    const[nweets, setNweets] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((doc)=>{
            const nweetObject = {
                ...doc.data(),
                id: doc.id,
            };
            console.log(doc.id, "=>", doc.data());
            setNweets((prev) => [nweetObject, ...prev]);
        });
    }

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createAt: Date.now(),
        });
        setNweet();
    };

    const onChange = (e) => {
       const {
        target : {value},
       } = e;
       setNweet(value);
    }

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
            <div>
                {nweets.map(nweet => <div>
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Home;