
import { SelectDataTable } from '@/app/components/Select-Data-table';
import { columns } from './columns';

type Props =
  {
    data: any
  }

const UnscheduledTaskTable =  ({ data}: Props) => {
  
  return (
    <>
      <SelectDataTable columns={columns} data={data.slice(0,100)} customCount={data.length} actionName='Update' actionURL='/users'/>
    </>
  )
}

export default UnscheduledTaskTable