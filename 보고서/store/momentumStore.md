# momentumStore.md

## 1. 개요
모멘텀(타이밍) 전략 관련 설정 및 상태를 관리하는 Zustand 스토어입니다. 모멘텀 전략의 활성화 여부와 다양한 설정값을 저장하며, UI 및 비즈니스 로직에 활용합니다.

## 2. State

| State Key         | Type              | 설명                           |
|-------------------|-------------------|--------------------------------|
| momentum          | boolean           | 모멘텀 전략 활성화 여부         |
| momentumSettings  | MomentumSettings  | 모멘텀 전략 세부 설정값         |

`MomentumSettings` 타입:
| 필드명             | 타입         | 설명                       |
|--------------------|-------------|----------------------------|
| index              | string      | 인덱스                      |
| baseLine           | string      | 기준선                     |
| baseMovingAvg      | string      | 기준선 이동평균            |
| baseLinePeriod     | string      | 기준선 기간                |
| boundaryLine       | string      | 경계선                     |
| boundaryMovingAvg  | string      | 경계선 이동평균            |
| boundaryPeriod     | string      | 경계선 기간                |
| entryWeight        | string      | 진입 비중                  |
| liquidationWeight  | string      | 청산 비중                  |

## 3. Action

| Action                   | Params                                 | 설명                                      |
|--------------------------|----------------------------------------|-------------------------------------------|
| setMomentum              | (momentum: boolean)                    | 모멘텀 전략 활성화/비활성화 설정           |
| updateMomentumSettiongs  | (settings: Partial<MomentumSettings>)  | 모멘텀 전략 세부 설정값 일부 수정          |
| getMomentumSettings      | ()                                     | 모멘텀 전략 세부 설정값 반환               |
| getData                  | ()                                     | 전체 모멘텀 전략 데이터 반환               |
| reset                    | ()                                     | 모멘텀 전략 상태 초기화                    |

## 4. 사용 예시

```tsx
import { useMomentumStore } from 'store/momentumStore';

const { momentum, setMomentum, updateMomentumSettiongs } = useMomentumStore();

setMomentum(true);
updateMomentumSettiongs({ index: 'KOSPI', entryWeight: '20' });
```

## 5. 설계 의도
- **구조**: 모멘텀 전략의 활성화 여부와 세부 설정값을 한 곳에서 관리하여, UI 및 비즈니스 로직의 일관성 확보.
- **장점**: 코드 가독성, 유지보수성, 확장성.
- **단점**: -

## 6. 주의 사항/한계
- 값 변경 시 UI와의 동기화에 주의.

