# assetsStore.md

## 1. 개요
자산(Asset) 관련 상태와 비즈니스 로직을 관리하는 Zustand 스토어입니다. 자산 리스트의 추가, 수정, 삭제, 개별 자산 조회 등 자산군 관리 기능을 제공합니다. 특히 미국 자산군의 환율 반영 상태를 전략 스토어와 연동하여 전체 환율 반영 여부를 동적으로 관리합니다.

## 2. State

| State Key   | Type           | 설명                           |
|-------------|----------------|--------------------------------|
| assetList   | AssetData[]    | 전체 자산 데이터 리스트        |

`AssetData` 타입:
| 필드명             | 타입         | 설명                       |
|--------------------|-------------|----------------------------|
| id                 | string      | 자산 고유 식별자           |
| type               | AssetType   | 자산 종류                  |
| assetGroup         | string      | 자산 그룹명                |
| weight             | string      | 자산 비중                  |
| exchangeRateState  | boolean     | 환율 반영 여부             |

## 3. Action

| Action         | Params                                         | 설명                                                         |
|----------------|-----------------------------------------------|--------------------------------------------------------------|
| addAsset       | ()                                            | 새로운 자산을 리스트에 추가 (기본값으로 생성)                 |
| updateAsset    | (id: string, newData: Partial<AssetData>)     | 특정 자산의 일부 정보를 수정, 미국 자산군 환율 상태 연동      |
| deleteAsset    | (id: string)                                  | 자산 리스트에서 해당 id의 자산을 삭제, 미국 자산군 환율 상태 연동 |
| getAssetItem   | (id: string)                                  | id로 자산 데이터 반환                                         |
| getData        | ()                                            | 전체 자산 리스트 반환                                         |
| reset          | ()                                            | 자산 리스트 초기화                                            |

## 4. 사용 예시

```tsx
import { useAssetStore } from 'store/assetsStore';

const { assetList, addAsset, updateAsset, deleteAsset } = useAssetStore();

addAsset();
updateAsset('uuid', { weight: '10', exchangeRateState: true });
deleteAsset('uuid');
```

## 5. 설계 의도
- **구조**: 자산군 관리와 미국 자산군 환율 반영 상태를 전략 스토어와 연동하여, 비즈니스 로직의 일관성과 확장성을 확보.
- **대안**: 모든 상태를 하나의 스토어에 넣는 방식보다, 역할별 분리와 cross-store 연동이 명확함.
- **장점**: 코드 가독성, 유지보수성, cross-store 연동을 통한 비즈니스 규칙 구현.
- **단점**: 여러 스토어 간 의존성이 생길 수 있으며, getState/setState 사용 시 순환 참조에 주의 필요.

## 6. 주의 사항/한계
- 미국 자산군 환율 반영 상태 연동 시, 상태 동기화 및 순환 참조에 주의.
- assetList가 커질 경우, 불필요한 리렌더링을 막기 위해 selector 및 memoization 활용 권장.
- 외부 스토어 상태 변경 시, 비동기 처리 및 일관성 유지에 신경 써야 함.
