export const menu = [
    {
        title: '파운드리',
        items: [
            {
                title: '주식 퀀트',
                description: '주식 퀀트 시작하기',
                items: [
                    {
                        title: '전략 설계',
                        description: '팩터 전략, 자산 배분, 전략 예시, 파트너십',
                        link: '/quant/stock/strategy-design'
                    },
                    {
                        title: '내 투자',
                        description: '주식 계좌 조회/관리',
                        link: '/quant/stock/my-investment'
                    },
                    {
                        title: '전략',
                        description: '주식 타이탄 전략, 전략 배분, 내 전략',
                        link: '/quant/stock/strategy'
                    }
                ]
            },
            {
                title: '코인 퀀트',
                description: '코인 퀀트 시작하기',
                items: [
                    {
                        title: '전략 설계',
                        description: '추세 전략, 자산 배분, 전략 예시',
                        link: '/quant/coin/strategy-design'
                    },
                    {
                        title: '내 투자',
                        description: '코인 계좌 조회/관리',
                        link: '/quant/coin/my-investment'
                    },
                    {
                        title: '전략',
                        description: '코인 타이탄 전략, 내 전략',
                        link: '/quant/coin/strategy'
                    }
                ]
            }
        ],
    },
    {
        title: '고객지원',
        items: [
            {
                title: '공지사항 · 이벤트',
                description: '퀀터스 소식을 확인해보세요',
                items: []
            },
            {
                title: '카카오톡 고객센터',
                description: '궁금한 사항을 상담해보세요',
                items: []
            },
            {
                title: '퀀터스 가이드',
                description: '이용 가이드를 확인해보세요',
                items: []
            }
        ]
    }
];

export const algorithms = [
    '전략배분 (정적자산배분)',
    '듀얼모멘텀',
    'VAA',
    'DAA',
    'BAA 공격형',
    'BAA 중도형',
    'LAA',
    'HAA',
    '변형듀얼모멘텀',
    '가속듀얼모멘텀'
]

export const rebalancingPeriods = [
    '월별',
    '분기별',
    '반기별',
    '매년',
    '시즈널리티',
    '하지 않음 (Buy-and-Hold)'
]
export const typeOfInvestment = [
    '한국 자산군',
    '미국 자산군',
    '전략',
    '한국 ETF',
    '미국 ETF',
    '한국 주식',
    '미국 주식'
];

export type AssetType = typeof typeOfInvestment[number];

export const indexs = [
    'S&P 500',
    'NASDAQ 100',
    'Russell 2000 지수',
    'KOSPI',
    'KOSDAQ 150',
    '다우 존스 산업지수',
    '필라델피아 반도체 지수',
    '미국 장기 국채 (ICE U.S. Treasury 20+ Year Bond Index)',
    '미국 물가 연동채 (TIPS)',
    '글로벌 리튬 지수 (Solactive Global Lithium Index)',
    '아시아 태평양 지수 (MSCI AC Asia Pacific Index)',
    '세계 금속 지수 (S&P Global Metals Index)',
    '세계 농산물 지수 (S&P Global Agriculture Index)',
    '세계 채권 지수 (Bloomberg Global Aggregate Bond Index)'
]

export const baseLines = [
    '종가',
    '고, 저 평균',
    '고, 저, 종가 평균'
]

export const avgLines = [
    'EMA',
    'SMA'
]

export const bands = [
    '변동성 (표준편차)',
    'ATR (Average True Range)'
]