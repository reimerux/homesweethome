import prisma from '@/prisma/client';
import Link from 'next/link';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserTable = async () => {
  
  const users = await prisma.user.findMany();

  return (
    <div className="rounded-md border">
      <table className="table">
        <thead>
          <tr>
            <td></td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
            <td><Link className="btn btn-sm" href={'/admin/users/' + user.id + '/edit'}>Edit</Link></td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable