import React from 'react';
import './HomePage.css';


const featuredContent = [
    { id: 1, title: '희창', img: '/image/face/희창.png' },
    { id: 2, title: '희창2', img: '/image/face/희창.png' },
    { id: 3, title: '희창3', img: '/image/face/희창.png' },
    { id: 4, title: '희창4', img: '/image/face/희창.png' },
    { id: 5, title: '희창5', img: '/image/face/희창.png' },
    { id: 6, title: '희창6', img: '/image/face/희창.png' },
    { id: 7, title: '희창7', img: '/image/face/희창.png' },
    { id: 8, title: '희창8', img: '/image/face/희창.png' },

];

const FeaturedGrid = () => {
    return (
        <div className='featured-grid'>
            {featuredContent.map(content => (
                <div key={content.id} className='featured-item'>
                    <img src={content.img} alt={content.title} className='featured-image' />
                    <h2 className='featured-title'>{content.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default FeaturedGrid;
