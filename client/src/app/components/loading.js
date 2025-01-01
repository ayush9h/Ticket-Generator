import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <div className="max-width mt-10">
            <SkeletonTheme baseColor='#dbeafe' highlightColor='#60a5fa'>
                <Skeleton count={1} className='max-width h-14'/>
            </SkeletonTheme>
        </div>
    )
}