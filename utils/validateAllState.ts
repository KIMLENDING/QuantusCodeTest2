// validateAllState.ts
// 저장 전 각 상태값을 검증하고, 예외 발생 시 에러 메시지를 반환하는 함수

export interface ValidateResult {
    valid: boolean;
    errors: string[];
}

export function validateAllState(allState: any): ValidateResult {
    const errors: string[] = [];

    validateStrategy(allState, errors);
    validateAsset(allState, errors);
    validateMomentum(allState, errors);
    validateReEntry(allState, errors);
    validateDateRange(allState, errors);

    return {
        valid: errors.length === 0,
        errors,
    };
}

function validateStrategy(allState: any, errors: string[]): void {
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

    validateBandRebalancing(allState.strategy.bandRebalancing, errors);
}

function validateBandRebalancing(bandRebalancing: any, errors: string[]): void {
    /**0에서 100 입력가능 */
    if (!bandRebalancing || bandRebalancing === '' ||
        isNaN(Number(bandRebalancing)) ||
        Number(bandRebalancing) < 0 || Number(bandRebalancing) > 100) {
        errors.push('밴드 리밸런싱을 선택하세요.');
    }
}

function validateAsset(allState: any, errors: string[]): void {
    if (!allState.asset || !Array.isArray(allState.asset.assetList) || allState.asset.assetList.length === 0) {
        errors.push('자산군을 1개 이상 추가하세요.');
        return;
    }

    allState.asset.assetList.forEach((asset: any, idx: number) => {
        if (!asset.type) {
            errors.push(`자산 ${idx + 1}의 종류를 선택하세요.`);
        }
        if (!asset.assetGroup) {
            errors.push(`자산 ${idx + 1}의 자산군을 선택하세요.`);
        }
        validateAssetWeight(asset.weight, idx, errors);
    });
}

function validateAssetWeight(weight: any, idx: number, errors: string[]): void {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0 || Number(weight) > 100) {
        errors.push(`자산 ${idx + 1}의 비중은 0보다 크고 100 이하여야 합니다.`);
    }
}

function validateMomentum(allState: any, errors: string[]): void {
    if (!allState.momentum) return;

    const settings = allState.momentum.momentumSettings;

    if (!settings.index) errors.push('모멘텀 인덱스를 선택하세요.');
    if (!settings.baseLine) errors.push('기준선을 선택하세요.');
    if (!settings.baseMovingAvg) errors.push('이동평균(기준선)을 선택하세요.');

    validateBaseLinePeriod(settings.baseLinePeriod, errors);

    if (!settings.boundaryLine) errors.push('기준선을 선택하세요.');
    if (!settings.boundaryMovingAvg) errors.push('이동평균(기준선)을 선택하세요.');

    validateBoundaryPeriod(settings.boundaryPeriod, errors);
    validateEntryWeight(settings.entryWeight, errors);
    validateLiquidationWeight(settings.liquidationWeight, errors);
}

function validateBaseLinePeriod(period: any, errors: string[]): void {
    if (!period) {
        errors.push('기간을 선택하세요.');
        return;
    }
    // 기간은 1에서 20까지 입력 가능
    if (isNaN(Number(period)) || Number(period) < 1 || Number(period) > 20) {
        errors.push('기간은 1에서 20까지 입력 가능합니다.');
    }
}

function validateBoundaryPeriod(period: any, errors: string[]): void {
    if (!period) {
        errors.push('기간을 선택하세요.');
        return;
    }
    // 기간은 10에서 60까지 입력 가능
    if (isNaN(Number(period)) || Number(period) < 10 || Number(period) > 60) {
        errors.push('기간은 10에서 60까지 입력 가능합니다.');
    }
}

function validateEntryWeight(weight: any, errors: string[]): void {
    if (!weight) {
        errors.push('진입 가중치를 입력하세요');
        return;
    }
    // 1에서 5까지 입력가능
    if (isNaN(Number(weight)) || Number(weight) < 1 || Number(weight) > 5) {
        errors.push('진입 가중치는 1에서 5까지 입력 가능합니다.');
    }
}

function validateLiquidationWeight(weight: any, errors: string[]): void {
    if (!weight) {
        errors.push('청산 가중치를 입력하세요.');
        return;
    }
    // 1에서 5까지 입력가능
    if (isNaN(Number(weight)) || Number(weight) < 1 || Number(weight) > 5) {
        errors.push('청산 가중치는 1에서 5까지 입력 가능합니다.');
    }
}

function validateReEntry(allState: any, errors: string[]): void {
    if (!allState.reEntry) return;

    const settings = allState.reEntry.reEntrySettings;

    if (!settings.method) errors.push('재진입 방법을 선택하세요.');
    if (!settings.period) errors.push('전략 이동평균선 기간을 입력하세요.');
    if (!settings.buyROC) errors.push('매수 이격도 기준을 입력하세요.');
    if (!settings.sellROC) errors.push('매도 이격도 기준을 입력하세요.');
}

function validateDateRange(allState: any, errors: string[]): void {
    if (!allState.strategy.startDate) errors.push('시작일을 선택하세요.');
    if (!allState.strategy.endDate) errors.push('종료일을 선택하세요.');

    // 시작일 보다 종료일이 빠르면 안됨 같을 순 있음
    if (allState.strategy.startDate && allState.strategy.endDate &&
        allState.strategy.startDate > allState.strategy.endDate) {
        errors.push('종료일은 시작일 이후여야 합니다.');
    }
}
