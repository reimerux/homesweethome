'use client'
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    const router = useRouter();
    const searchParams = useSearchParams()

    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    const changePageSize = (pagesize: number) => {

        const params = new URLSearchParams(searchParams);
        params.set('pagesize', pagesize.toString());
        params.set('page', "1");
        router.push('?' + params.toString());
    }

    return (
        <><div className='mr-4'>Page {currentPage} of {pageCount}</div>
            <div className="join">
                <button className="join-item btn" onClick={() => changePage(1)} disabled={currentPage === 1}>First</button>
                <button className="join-item btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className="join-item btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
                <button className="join-item btn" onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>Last</button>
            </div>
            <select defaultValue={10} onChange={e => changePageSize(parseInt(e.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </>
    )
}

export default Pagination