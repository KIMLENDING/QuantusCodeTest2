import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div>
            <div className="container mx-auto py-8"></div>
            <div className="w-full text-center text-2xl font-bold mb-6">
                <div>과제 2</div>
            </div>
            <div className="flex items-center justify-center ">
                <Link href="/quant/stock/my-investment" className="p-6 rounded-lg shadow hover:shadow-lg transition-shadow bg-red-300">
                    <h2 className="text-xl font-semibold mb-2 text-center">과제 페이지</h2>
                </Link>

            </div>
        </div>

    )
}

export default Page