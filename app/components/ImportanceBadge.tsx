import React from 'react'

type Props = {
    importance: string;
  };


const ImportanceBadge = (props: Props)  => {
    var badgeclass = "badge bg-blue-100 text-gray-400";
  switch (props.importance) {
    case 'MEDIUM':
        badgeclass = "badge bg-blue-400 text-gray-200"
        break;
    case 'HIGH':
        badgeclass = "badge bg-blue-700 text-gray-100"
        break;
    default:
        break;
  } 

    return (
    <div className={badgeclass} >{props.importance}</div>
  )
}

export default ImportanceBadge