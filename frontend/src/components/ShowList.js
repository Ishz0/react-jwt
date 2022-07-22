import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ShowList = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        getShows();
    }, []);

    const getShows = async () => {
        let result = await fetch('http://localhost:5000/shows',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setShows(result);
    }

    const deleteShow = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/show/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getShows();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if(result){
                setShows(result)
            }
        }else{
            getShows();
        }
        
    }

    return (
        <div className="show-list">
            <h3>Show List</h3>
            <input type="" className='search-show-box' placeholder='Search Show'
            onChange={searchHandle}
             />
            <ul>
                <li>S. No.</li>
                <li>Title</li>
                <li>streamingApp</li>
                <li>Rating</li>
                <li>Review</li>

            </ul>
            {
                shows.length>0 ? shows.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.title}</li>
                        <li>{item.streamingApp}</li>
                        <li>{item.rating}</li>
                        <li>
                            <button onClick={() => deleteShow(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id} >Update </Link>
                            </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ShowList;