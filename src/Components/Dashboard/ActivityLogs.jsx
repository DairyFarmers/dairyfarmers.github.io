import React from 'react';
import ActivityLogTable from '../tables/ActivityLogTable';

const ActivityLogs = () => {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-lg font-semibold ms-1 mt-2">
                    Recent Activity
                </h5>
            </div>
          <ActivityLogTable />
        </div>
      </div>
    </div>
  )
}

export default ActivityLogs