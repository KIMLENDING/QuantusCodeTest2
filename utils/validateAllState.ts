// validateAllState.ts
// 저장 전 각 상태값을 검증하고, 예외 발생 시 에러 메시지를 반환하는 함수

export interface ValidateResult {
    valid: boolean;
    errors: string[];
}

export function validateAllState(allState: any): ValidateResult {
    const errors: string[] = [];

    // 전략 검증
    if (!allState.strategy?.strategyName) {
        errors.push('전략 이름을 입력하세요.');
    }
    if (!allState.strategy.algorithm) {
        errors.push('자산배분 알고리즘을 선택하세요.');
    }
    if (!allState.strategy.seed || isNaN(Number(allState.strategy.seed)) || Number(allState.strategy.seed) <= 0) {
        errors.push('초기 투자 금액을 올바르게 입력하세요.');
    }
    if (!allState.strategy.rebalancingPeriod) {
        errors.push('리밸런싱 주기를 올바르게 입력하세요.');
    }
    /**0에서 100 입력가능 */
    if (!allState.strategy.bandRebalancing || allState.strategy.bandRebalancing === '' || isNaN(Number(allState.strategy.bandRebalancing)) || Number(allState.strategy.bandRebalancing) < 0 || Number(allState.strategy.bandRebalancing) > 100) {
        errors.push('밴드 리밸런싱을 선택하세요.');
    }


    // 자산 검증
    if (!allState.asset || !Array.isArray(allState.asset.assetList) || allState.asset.assetList.length === 0) {
        errors.push('자산군을 1개 이상 추가하세요.');
    } else {
        allState.asset.assetList.forEach((asset: any, idx: number) => {
            if (!asset.type) errors.push(`자산 ${idx + 1}의 종류를 선택하세요.`);
            if (!asset.assetGroup) errors.push(`자산 ${idx + 1}의 자산군을 선택하세요.`);
            if (!asset.weight || isNaN(Number(asset.weight)) || Number(asset.weight) <= 0 || Number(asset.weight) > 100) {
                errors.push(`자산 ${idx + 1}의 비중은 0보다 크고 100 이하여야 합니다.`);
            }
        });
    }

    // 모멘텀 검증
    if (allState.momentum) {
        // 필요한 값이 있으면 추가 검증
        if (!allState.momentum.momentumSettings.index) errors.push('모멘텀 인덱스를 선택하세요.');
        if (!allState.momentum.momentumSettings.baseLine) errors.push('기준선을 선택하세요.');
        if (!allState.momentum.momentumSettings.baseMovingAvg) errors.push('이동평균(기준선)을 선택하세요.');
        if (!allState.momentum.momentumSettings.baseLinePeriod) {
            errors.push('기간을 선택하세요.');
            // 기간은 1에서 20까지 입력 가능
            if (!allState.momentum.momentumSettings.baseLinePeriod || isNaN(Number(allState.momentum.momentumSettings.baseLinePeriod)) || Number(allState.momentum.momentumSettings.baseLinePeriod) < 1 || Number(allState.momentum.momentumSettings.baseLinePeriod) > 20) {
                errors.push('기간은 1에서 20까지 입력 가능합니다.');
            }
        }
        if (!allState.momentum.momentumSettings.boundaryLine) errors.push('기준선을 선택하세요.');
        if (!allState.momentum.momentumSettings.boundaryMovingAvg) errors.push('이동평균(기준선)을 선택하세요.');
        if (!allState.momentum.momentumSettings.boundaryPeriod) {
            errors.push('기간을 선택하세요.');
            // 기간은 10에서 60까지 입력 가능
            if (!allState.momentum.momentumSettings.boundaryPeriod || isNaN(Number(allState.momentum.momentumSettings.boundaryPeriod)) || Number(allState.momentum.momentumSettings.boundaryPeriod) < 10 || Number(allState.momentum.momentumSettings.boundaryPeriod) > 60) {
                errors.push('기간은 10에서 60까지 입력 가능합니다.');
            }
        }
        if (!allState.momentum.momentumSettings.entryWeight) {
            errors.push('진입 가중치를 입력하세요');
            // 1에서 5까지 입력가능
            if (!allState.momentum.momentumSettings.entryWeight || isNaN(Number(allState.momentum.momentumSettings.entryWeight)) || Number(allState.momentum.momentumSettings.entryWeight) < 1 || Number(allState.momentum.momentumSettings.entryWeight) > 5) {
                errors.push('진입 가중치는 1에서 5까지 입력 가능합니다.');
            }
        }
        if (!allState.momentum.momentumSettings.liquidationWeight) {
            errors.push('청산 가중치를 입력하세요.');
            // 1에서 5까지 입력가능
            if (!allState.momentum.momentumSettings.liquidationWeight || isNaN(Number(allState.momentum.momentumSettings.liquidationWeight)) || Number(allState.momentum.momentumSettings.liquidationWeight) < 1 || Number(allState.momentum.momentumSettings.liquidationWeight) > 5) {
                errors.push('청산 가중치는 1에서 5까지 입력 가능합니다.');
            }
        }

    }

    // 재진입 검증
    if (allState.reEntry) {
        // 필요한 값이 있으면 추가 검증
        if (!allState.reEntry.reEntrySettings.method) errors.push('재진입 방법을 선택하세요.');
        if (!allState.reEntry.reEntrySettings.period) errors.push('전략 이동평균선 기간을 입력하세요.');

        if (!allState.reEntry.reEntrySettings.buyROC) errors.push('매수 이격도 기준을 입력하세요.');
        if (!allState.reEntry.reEntrySettings.sellROC) errors.push('매도 이격도 기준을 입력하세요.');

    }
    if (!allState.strategy.startDate) errors.push('시작일을 선택하세요.');
    if (!allState.strategy.endDate) errors.push('종료일을 선택하세요.');
    // 시작일 보다 종료일이 빠르면 안됨 같을 순 있음
    if (allState.strategy.startDate && allState.strategy.endDate && allState.strategy.startDate > allState.strategy.endDate) {
        errors.push('종료일은 시작일 이후여야 합니다.');
    }
    return {
        valid: errors.length === 0,
        errors,
    };
}
