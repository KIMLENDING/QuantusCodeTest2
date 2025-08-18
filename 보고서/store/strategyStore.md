# strategyStore.md

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
| allExchangeRatesState | boolean   | 전체 환율 반영 상태            |

## 3. Action

| Action                   | Params                        | 설명                                                         |
|--------------------------|-------------------------------|--------------------------------------------------------------|
| setStrategyName          | (name: string)                | 전략명 설정                                                  |
| setAlgorithm             | (algorithm: string)           | 알고리즘 설정                                                |
| setSeed                  | (seed: string)                | 시드 값 설정                                                  |
| setRebalancingPeriod     | (period: string)              | 리밸런싱 주기 설정                                            |
| setBandRebalancing       | (band: string)                | 밴드 리밸런싱 값 설정                                         |
| setAllExchangeRatesState | ()                            | 전체 환율 반영 상태 토글 및 미국 자산군 환율 상태 일괄 반영   |
| getData                  | ()                            | 전체 전략 데이터 반환                                         |
| reset                    | ()                            | 전략 상태 초기화                                              |

## 4. 사용 예시

```tsx
import { useStrategyStore } from 'store/strategyStore';

const { strategyName, setStrategyName, setAllExchangeRatesState } = useStrategyStore();

setStrategyName('모멘텀 전략');
setAllExchangeRatesState();
```

## 5. 설계 의도
- **구조**: 전략 관련 상태와 설정값을 한 곳에서 관리하며, 자산 스토어와 연동하여 미국 자산군 환율 반영 상태를 일관성 있게 유지.
- **대안**: 모든 상태를 하나의 스토어에 넣는 방식보다, 역할별 분리와 cross-store 연동이 명확함.
- **장점**: 코드 가독성, 유지보수성, cross-store 연동을 통한 비즈니스 규칙 구현.
- **단점**: 여러 스토어 간 의존성이 생길 수 있으며, getState/setState 사용 시 순환 참조에 주의 필요.

## 6. 주의 사항/한계
- 미국 자산군 환율 반영 상태 연동 시, 상태 동기화 및 순환 참조에 주의.
- 외부 스토어 상태 변경 시, 비동기 처리 및 일관성 유지에 신경 써야 함.
- 상태가 복잡해질 경우 selector 및 memoization 활용.