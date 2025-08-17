// 숫자만 허용하는 투자금 입력 핸들러(최대 9자리)
export const handleInvestmentChange = (value: string, onChange?: (v: string) => void) => {
    const numericValue = value.replace(/\D/g, '');
    const trimmedValue = numericValue.replace(/^0+/, '');
    if (trimmedValue.length > 9) {
        onChange?.('');
    } else {
        onChange?.(trimmedValue);
    }
};

// 0~100%만 허용하는 비율 입력 핸들러
export const handlePercentageChange = (value: string, onChange?: (v: string) => void) => {
    if (!/^\d*$/.test(value)) return;
    const isValidPercentage = /^(100$|^[1-9]?\d)$/.test(value);
    if (value.length > 1 && value.startsWith("0")) {
        value = value.replace(/^0+/, "");
        return onChange?.(value);
    }
    if (!isValidPercentage) {
        onChange?.('');
    } else {
        onChange?.(value);
    }
};
// 1.0부터 5.0까지 입력 핸들러 소숫점은 최대 2자리까지만 허용
export const handleWeightChange = (value: string, onChange?: (v: string) => void) => {
    if (!/^\d*\.?\d*$/.test(value)) return; // 숫자와 소수점만 허용
    const numericValue = parseFloat(value);
    if (value.length > 4) return;
    if (numericValue < 1.0 || numericValue > 5.0) {
        onChange?.('1.5'); // 기본값으로 설정
    } else {
        onChange?.(value);
    }


};

// 1부터 20까지 입력 핸들러
export const handleDaysChange = (value: string, onChange?: (v: string) => void) => {
    if (!/^\d*$/.test(value)) return;
    const numericValue = parseInt(value, 10);
    if (numericValue < 1 || numericValue > 20) {
        onChange?.('1');
    } else {
        onChange?.(value);
    }
};

// 숫자만 허용 핸들러
export const handleBandDaysChange = (value: string, onChange?: (v: string) => void) => {
    // 숫자만 허용
    if (!/^\d*$/.test(value)) return;
    if (value.length > 2) return; // 최대 2자리 숫자만 허용
    onChange?.(value);
};
