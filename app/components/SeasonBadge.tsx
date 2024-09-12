import React from 'react'
import { MdHub, MdSunny } from 'react-icons/md';
import { WiLunarEclipse, WiDayCloudy, WiThunderstorm } from 'react-icons/wi';

type Props = {
    season: string | null;
  };


const SeasonBadge = (props: Props)  => {
    var icon = <div></div>;
  switch (props.season) {

    case 'WINTER':
        icon = <div className='flex'><MdHub />Winter</div>
        break;
    case 'SPRING':
        icon = <div className='flex'><WiDayCloudy />Spring</div>
        break;
    case 'SUMMER':
        icon = <div className='flex mr-2'><MdSunny />Summer</div>
        break;
    case 'FALL':
        icon = <div className='flex mr-2'><WiThunderstorm />Fall</div>
        break;
    default:
      icon = <div className='flex mr-2'>-</div>
      break;
  } 

    return (
    icon
  )
}

export default SeasonBadge