import React from 'react';

const AddShow = () => {
    const [title, setTitle] = React.useState('');
    const [streamingApp, setStreamingApp] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [review, setReview] = React.useState('');
    const [error,setError] = React.useState(false);

    const addShow = async () => {

        if(!title || !streamingApp || !rating || !review)
        {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-show", {
            method: "post",
            body: JSON.stringify({ title, streamingApp, rating, review, userId }),
            headers: {
                "Content-type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result)

    }

    return (
        <div className='show'>
            <h1>Add Show</h1>
            <input type="text" placeholder='Enter show name' className='inputBox'
                value={title} onChange={(e) => { setTitle(e.target.value) }}
            />
            {error && !title && <span className='invalid-input'>Enter valid title</span>}

            <input type="text" placeholder='Enter Streaming App' className='inputBox'
                value={streamingApp} onChange={(e) => { setStreamingApp(e.target.value) }}
            />
            {error && !streamingApp && <span className='invalid-input'>Enter valid Streaming App</span>}

            <input type="text" placeholder='Enter Show Rating' className='inputBox'
                value={rating} onChange={(e) => { setRating(e.target.value) }}
            />
            {error && !rating && <span className='invalid-input'>Enter valid ratings</span>} 

            <input type="text" placeholder='Enter Show reviews' className='inputBox'
                value={review} onChange={(e) => { setReview(e.target.value) }}
            />
            {error && !review && <span className='invalid-input'>Enter valid review</span>}


            <button onClick={addShow} className='appButton'>Add Show</button>
        </div>
    )
}

export default AddShow;