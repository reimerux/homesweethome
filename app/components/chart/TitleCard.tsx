import { ReactNode } from "react"

type Props = {
    title: string,
    topMargin: string | null,
    TopSideButtons: boolean,
    children: ReactNode
}

  function TitleCard({title, children, topMargin, TopSideButtons}: Props){
      return(
          <div className={"card w-full p-6 bg-base-100 shadow " + (topMargin || "mt-6")}>

            {/* Title for Card */}
              <span className={TopSideButtons ? "inline-block" : ""}>
                <b>{title}</b>

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </span>
              
              <div className="divider mt-2"></div>
          
              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>
          
      )
  }
  
  
  export default TitleCard