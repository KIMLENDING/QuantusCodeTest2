# momentum 폴더 컴포넌트 구조 보고서

## 1. 개요

`components/Main/momentum` 폴더는 모멘텀 전략의 세부 설정을 담당하는 컴포넌트들로 구성되어 있습니다. 각 컴포넌트는 모멘텀 전략의 주요 파라미터(기준선, 이동평균, 기간, 진입/청산 가중치 등)를 독립적으로 입력·관리할 수 있도록 분리되어 있습니다.

## 2. 주요 컴포넌트 역할

- **MomentumIndex**: 모멘텀 인덱스 선택
- **MomentumBaseLine**: 기준선 선택
- **MomentumBaseLinePeriod**: 기준선 기간 입력(1~20)
- **MomentumBaseMovingAvg**: 기준선 이동평균 선택
- **MomentumBoundaryLine**: 경계선 선택
- **MomentumBoundaryPeriod**: 경계선 기간 입력(10~60)
- **MomentumBoundaryMovingAvg**: 경계선 이동평균 선택
- **MomentumEntryWeight**: 진입 가중치 입력(1~5)
- **MomentumLiquidationWeight**: 청산 가중치 입력(1~5)

## 3. 구조적 장점

- **모듈화**: 각 파라미터별로 컴포넌트를 분리하여, 유지보수와 확장에 용이
- **유효성 검사**: 각 입력값에 대해 범위 및 타입 유효성 검증 가능
- **상태관리 연동**: zustand store와 연동하여, 각 파라미터의 값이 실시간으로 상태에 반영됨
- **UI/비즈니스 로직 분리**: UI와 상태 관리 로직이 명확히 분리되어 실무적 협업에 유리

## 4. 결론

momentum 폴더의 컴포넌트들은 모멘텀 전략의 세부 파라미터를 독립적으로 관리할 수 있도록 설계되어, 실무에서 요구되는 유지보수성, 확장성, 성능을 모두 만족시킵니다. 각 컴포넌트의 역할 분담과 zustand 기반 상태관리로, 모멘텀 전략 설정의 모든 요구사항을 효과적으로 처리할 수 있습니다.
