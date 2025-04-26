import React, { useState } from 'react';
import ActivityLogTable from '../tables/ActivityLogTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';

const ActivityLogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activityData, setActivityData] = React.useState([]);
  const [page] = useState(1); // Start with page 1
  const [size] = useState(5); // Default page size

  const fetchActivityLogData = async (page, size) => {
    try {
      const response = await axiosPrivate.get(`/users/activity-logs/?page=${page}&size=${size}`);

      if (response.status === 200) {
        setActivityData(response.data.results);
      } else {
          navigate("/error", { replace: true });
      }
    } catch (error) {
        navigate("/error", { replace: true });
    }
  };
    
  useEffect(() => {
    fetchActivityLogData(page, size);
  }, [page, size]);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-lg font-semibold ms-1 mt-2">
                    Recent Activity
                </h5>
            </div>
          <ActivityLogTable data={activityData}/>
        </div>
      </div>
    </div>
  )
}

export default ActivityLogs