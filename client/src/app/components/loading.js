import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <div className="max-width mt-10">
            <SkeletonTheme baseColor='#cbd5e1' highlightColor='#64748b'>
                <Skeleton count={1} width={1470} height={100}/>
            </SkeletonTheme>
        </div>
    )
}