import { Await, useLoaderData } from 'react-router-dom'
import type { Product }  from '../../intefaces/product.inteface'
import { Suspense } from 'react'
import Loader from '../../components/Loader/Loader'

export function Product() {
    const data = useLoaderData() as { data: Product }

    return <>
        <Suspense fallback={<Loader />}>
            <Await resolve={data.data}>
                {({ data }: { data: Product }) => (
                    <>Product - {data.name}</>
                )}
            </Await>
        </Suspense>
    </>
}