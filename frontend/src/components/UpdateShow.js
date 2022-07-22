import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateShow = () => {
    const [title, setTitle] = React.useState('');
    const [streamingApp, setStreamingApp] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [review, setReview] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getShowDetails();
    }, [])

    const getShowDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/show/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setTitle(result.title);
        setStreamingApp(result.streamingApp);
        setRating(result.rating);
        setReview(result.review)
    }

    const updateShow = async () => {
        console.warn(title, streamingApp, rating, review)
        let result = await fetch(`http://localhost:5000/show/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ title, streamingApp, rating, review }),
            headers: {
                'Content-Type': 'Application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='show'>
            <h1>Update Show</h1>
            <input type="text" placeholder='Enter show name' className='inputBox'
                value={title} onChange={(e) => { setTitle(e.target.value) }}
            />

            <input type="text" placeholder='Enter Streaming App' className='inputBox'
                value={streamingApp} onChange={(e) => { setStreamingApp(e.target.value) }}
            />

            <input type="text" placeholder='Enter show rating' className='inputBox'
                value={rating} onChange={(e) => { setRating(e.target.value) }}
            />

            <input type="text" placeholder='Enter show review' className='inputBox'
                value={review} onChange={(e) => { setReview(e.target.value) }}
            />


            <button onClick={updateShow} className='appButton'>Update Show</button>
        </div>
    )
}

export default UpdateShow;