import { useAssetsDataStore } from "@/store/assetsDataStore";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";


interface AllCheckboxProps {
    id: string;
    label: string;
    tip?: string;
    onChange?: (checked: boolean) => void;
}
const AllCheckbox = ({ id = '전체 환율 반영', label = '전체 환율 반영', tip, onChange }: AllCheckboxProps) => {
    const { allExchangeRatesState, setAllExchangeRatesState, assetList } = useAssetsDataStore();
    const [checked, setChecked] = useState(false);
    console.log(id, checked, allExchangeRatesState);

    useEffect(() => {
        setChecked(allExchangeRatesState);
    }, [allExchangeRatesState,])

    const handleChange = () => {
        if (assetList.length === 0) return;

        // 미국 관련 자산군만 필터링
        const usAssets = assetList.filter(asset =>
            asset.type === '미국 자산군' ||
            asset.type === '미국 ETF' ||
            asset.type === '미국 주식'
        );
        if (usAssets.length === 0) return;
        setChecked(!checked);
        setAllExchangeRatesState();
    };
    return (
        <div className="flex items-center w-full gap-2">
            <label
                htmlFor={id}
                className="flex items-center gap-2 w-fit cursor-pointer"
                style={{
                    minWidth: 140,
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#fff",
                }}
            >
                {/* 숨겨진 기본 체크박스 */}
                <input
                    id={id}
                    type="checkbox"
                    checked={allExchangeRatesState}
                    onChange={handleChange}
                    className="sr-only"
                />

                {/* 커스텀 체크박스 UI */}
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <rect
                            x="1"
                            y="1"
                            width="20"
                            height="20"
                            rx="3"
                            stroke="#4C4C4C"
                            strokeWidth="2"
                            fill={checked ? "#4C4C4C" : "none"}
                        />
                        {checked && (
                            <path
                                d="M5 11L9 15L17 7"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                            />
                        )}
                    </svg>
                </div>

                <span className="text-nowrap text-white">{label}</span>
            </label>
            {tip && (<div>

                <span data-tooltip-id="checkbox-tooltip" className="cursor-help ml-1 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" stroke="#4C4C4C" />
                        <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#4C4C4C" fontWeight="bold">?</text>
                    </svg>
                </span>
                <Tooltip
                    id="checkbox-tooltip"
                    place="right"
                    content="이 옵션을 선택하면 모든 통화에 대한 환율이 반영됩니다."
                    style={{ backgroundColor: "#333", color: "#fff", padding: "8px", borderRadius: "4px" }}
                />
            </div>
            )
            }
        </div>
    );
}

export default AllCheckbox;