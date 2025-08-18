'use client'


import LeftSideBar from "@/components/market/Layout/LeftSideBar";
import Main from "@/components/market/Main";

import Link from "next/link";
import { useParams } from "next/navigation";

const Market = () => {
  const { market, type } = useParams();

  const getSubTitle = (type: string) => {
    if (type === 'strategy-design') return '전략 설계';
    if (type === 'my-investment') return '내 투자';
    if (type === 'strategy') return '전략';
    return '';
  };

  const subTitle = getSubTitle(type as string);
  return (
    <div className="flex-grow flex flex-col h-full ">
      <div className="min-h-[calc(100vh-400px)] w-full">
        <section className="w-full border-b border-gray25 pt-[40px]">
          <div className="w-[1280px] mx-auto flex items-start gap-[40px] h-[44px]">
            <h1 className={`text-[16px] font-medium h-full ${subTitle === '전략 설계' ? 'text-white border-b-2 border-white' : 'text-gray4c'}`}>
              <Link href={`/quant/${market}/strategy-design`}>전략 설계</Link>
            </h1>
            <h1 className={`text-[16px] font-medium h-full ${subTitle === '내 투자' ? 'text-white border-b-2 border-white' : 'text-gray4c'}`}>
              <Link href={`/quant/${market}/my-investment`}>내 투자</Link>
            </h1>
            <h1 className={`text-[16px] font-medium h-full ${subTitle === '전략' ? 'text-white border-b-2 border-white' : 'text-gray4c'}`}>
              <Link href={`/quant/${market}/strategy`}>전략</Link>
            </h1>
          </div>
        </section>
        <main className="flex gap-[30px] w-full max-w-[1280px] mx-auto">
          <LeftSideBar />
          <div className="w-full">
            <Main />
          </div>
        </main>
      </div>
    </div>

  );
}

export default Market