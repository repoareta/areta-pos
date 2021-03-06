import React from 'react'

export default function ContentWrapper({component}) {
    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            {component}
        </div>
    )
}
