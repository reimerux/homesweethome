import React from 'react'

type Props = {
    importance: string;
  };


const ImportanceBadge = (props: Props)  => {
    var badgeclass = "badge badge-ghost";
  switch (props.importance) {
    case 'MEDIUM':
        badgeclass = "badge badge-secondary"
        break;
    case 'HIGH':
        badgeclass = "badge badge-primary"
        break;
    default:
        break;
  } 

    return (
    <div className={badgeclass} >{props.importance}</div>
  )
}

export default ImportanceBadge