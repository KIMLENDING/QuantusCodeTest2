'use client'

import LeftSideBar from "@/app/components/LeftSideBar";
import Main from "@/app/components/Main";
import Link from "next/link";
import { useParams } from "next/navigation";

const Market = () => {
  const { market, type } = useParams();
  const subTitle = type === 'strategy-design' ? '전략 설계' :
    type === 'my-investment' ? '내 투자' :
      type === 'strategy' ? '전략' : '';
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