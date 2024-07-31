import React, { useState } from 'react';
import dayjs from 'dayjs';
import './JobCard.css';
import JobDetailsModal from './JobDetailsModal';

function JobCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(props.postedOn, 'day');

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className='job-card'>
      <div className='card-content'>
        <div className='company-info'>
          <img src={props.logo} className='company-logo' />
          <h2 className='company-name'>{props.company}</h2>
        </div>
        <h3 className='job-title'>{props.title}</h3>
        <p className='job-details'>
          {props.type} &#x2022; {props.experience} &#x2022; {props.location}
        </p>
        <p className='posted-info'>
          Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
        </p>
        <button className='apply-button' onClick={handleApplyClick}>
          Apply
        </button>
      </div>
      {/* {isModalOpen && (
        <JobDetailsModal
          job={props}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
}

export default JobCard;


// import React from 'react';
// import dayjs from 'dayjs';
// import './JobCard.css';
// import { Link } from 'react-router-dom';

// function JobCard(props) {
//   const date1 = dayjs(Date.now());
//   const diffInDays = date1.diff(props.postedOn, 'day');

//   return (
//     <div className='job-card'>
//       <div className='card-content'>
//         <div className='company-info'>
//           <img src={props.logo} alt={props.company} className='company-logo' />
//         </div>
//         <h3 className='job-title'>{props.title}</h3>
//         <p className='job-details'>
//           {props.type} &#x2022; {props.experience} &#x2022; {props.location}
//         </p>
//         <p className='posted-info'>
//           Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
//         </p>
//         <Link to={`/jobs/${props.id}`}>
//           <button className='apply-button'>Apply</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default JobCard;
