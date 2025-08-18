# reEntryStore.md

## 1. 개요
재진입(Re-Entry) 전략 관련 상태와 설정값을 관리하는 Zustand 스토어입니다. 재진입 전략의 활성화 여부와 다양한 설정값을 저장하며, UI 및 비즈니스 로직에 활용합니다.

## 2. State

| State Key         | Type              | 설명                           |
|-------------------|-------------------|--------------------------------|
| reEntry           | boolean           | 재진입 전략 활성화 여부         |
| reEntrySettings   | ReEntrySettings   | 재진입 전략 세부 설정값         |

`ReEntrySettings` 타입:
| 필드명             | 타입         | 설명                       |
|--------------------|-------------|----------------------------|
| method             | 'SMA'|'EMA'|'HMA' | 재진입 방식                |
| period             | string      | 기간                       |
| buyROC             | string      | 매수 ROC                   |
| sellROC            | string      | 매도 ROC                   |

## 3. Action

| Action                   | Params                                 | 설명                                      |
|--------------------------|----------------------------------------|-------------------------------------------|
| setReEntry               | (reEntry: boolean)                     | 재진입 전략 활성화/비활성화 설정           |
| updateReEntrySettings    | (settings: Partial<ReEntrySettings>)   | 재진입 전략 세부 설정값 일부 수정          |
| getReEntrySettings       | ()                                     | 재진입 전략 세부 설정값 반환               |
| getData                  | ()                                     | 전체 재진입 전략 데이터 반환               |
| reset                    | ()                                     | 재진입 전략 상태 초기화                    |

## 4. 사용 예시

```tsx
import { useReEntryStore } from 'store/reEntryStore';

const { reEntry, setReEntry, updateReEntrySettings } = useReEntryStore();

setReEntry(true);
updateReEntrySettings({ method: 'EMA', period: '30' });
```

## 5. 설계 의도
- **구조**: 재진입 전략의 활성화 여부와 세부 설정값을 한 곳에서 관리하여, UI 및 비즈니스 로직의 일관성 확보.
- **장점**: 코드 가독성, 유지보수성, 확장성.

## 6. 주의 사항/한계
- 값 변경 시 UI와의 동기화에 주의.
- 상태가 복잡해질 경우 selector 및 memoization 활용.
