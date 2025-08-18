'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';

import React from 'react'

const QuantTypeHeader = () => {
    const { market } = useParams();

    const mainTitle = market === 'stock' ? '주식 퀀트' : '코인 퀀트';



    return (
        <div className="flex flex-col w-full h-full">
            <article className="pt-[50px] w-[1280px] mx-auto">
                <section className="flex items-center gap-5">
                    <div className="flex items-center">
                        <Link href="/quant/stock/strategy-design">
                            <h1 className={`font-bold ${mainTitle === '주식 퀀트' ? 'text-white text-[28px]' : 'text-gray4c text-[22px]'}`}>
                                주식 퀀트
                            </h1>
                        </Link>
                        <div className="w-[1px] h-[12px] bg-gray25 ml-5" />
                    </div>
                    <div className="flex items-center">
                        <Link href="/quant/coin/strategy-design">
                            <h1 className={`font-bold ${mainTitle === '코인 퀀트' ? 'text-white text-[28px]' : 'text-gray4c text-[22px]'}`}>코인 퀀트</h1>
                        </Link>
                    </div>
                </section>
            </article>
        </div>
    )
}

export default QuantTypeHeader