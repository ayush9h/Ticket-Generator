import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <div className="max-width mt-10">
            <SkeletonTheme baseColor='#ebeaf6' highlightColor='#9b98d1'>
                <Skeleton count={1} width={1470} height={100}/>
            </SkeletonTheme>
        </div>
    )
}