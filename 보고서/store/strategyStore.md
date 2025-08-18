# strategyStore.ts 기술 보고서

## 1. 개요
투자 전략(Strategy) 관련 상태와 설정값을 관리하는 Zustand 스토어입니다. 전략명, 알고리즘, 시드, 리밸런싱 주기, 밴드 리밸런싱, 전체 환율 반영 상태 등 전략에 필요한 정보를 저장하며, 자산 스토어와 연동하여 미국 자산군 환율 반영 상태를 동적으로 관리합니다.

## 2. State

| State Key             | Type      | 설명                           |
|-----------------------|-----------|--------------------------------|
| strategyName          | string    | 전략 이름                      |
| algorithm             | string    | 사용 알고리즘                  |
| seed                  | string    | 시드(Seed) 값                  |
| rebalancingPeriod     | string    | 리밸런싱 주기                  |
| bandRebalancing       | string    | 밴드 리밸런싱 값               |
| startDate             | string    | 시작 날짜                     |
| endDate               | string    | 종료 날짜                     |
## 3. Action

| Action                   | Params                        | 설명                                                         |
|--------------------------|-------------------------------|--------------------------------------------------------------|
| setStrategyName          | (name: string)                | 전략명 설정                                                  |
| setAlgorithm             | (algorithm: string)           | 알고리즘 설정                                                |
| setSeed                  | (seed: string)                | 시드 값 설정                                                  |
| setRebalancingPeriod     | (period: string)              | 리밸런싱 주기 설정                                            |
| setBandRebalancing       | (band: string)                | 밴드 리밸런싱 값 설정                                         |
| setStartDate             | (date: string)                | 시작 날짜 설정                                                  |
| setStartDate             | (date: string)                | 종료 날짜 설정                                                  |
| getData                  | ()                            | 전체 전략 데이터 반환                                         |
| reset                    | ()                            | 전략 상태 초기화                                              |

## 4. 사용 예시

```tsx
import { useStrategyStore } from 'store/strategyStore';

const { strategyName, setStrategyName, } = useStrategyStore();

setStrategyName('모멘텀 전략');

```

## 5. 설계 의도
- **구조**: 전략 관련 상태와 설정값을 한 곳에서 관리하며, 자산 스토어와 연동하여 미국 자산군 환율 반영 상태를 일관성 있게 유지.
- **장점**: 코드 가독성, 유지보수성


## 6. 주의 사항/한계
- 값 변경 시 UI와의 동기화에 주의. 특히 StategyAllCheck 컴포넌트의 '전체 환율 반영'상태
