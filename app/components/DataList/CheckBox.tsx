import { useAssetsDataStore } from "@/store/assetsDataStore";
import { useEffect, useState } from "react";
import TooltipComponent from "./TooltipComponent";


interface CheckboxProps {
    id: string;
    label: string;
    tip?: string;
    onChange?: (checked: boolean) => void;
}
const Checkbox = ({ id, label, tip, onChange }: CheckboxProps) => {
    const { getAssetItem, assetList } = useAssetsDataStore();
    const [checked, setChecked] = useState<boolean | undefined>(undefined);
    console.log('개별체크박스', id, checked, getAssetItem(id));

    useEffect(() => {
        setChecked(getAssetItem(id)?.exchangeRateState);
    }, [getAssetItem(id)])

    const handleChange = () => {
        if (assetList.length === 0) return;
        setChecked(!checked);
        // 개별 자산에 대한 환율 반영 상태 업데이트
        onChange?.(!getAssetItem(id)?.exchangeRateState);

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
                    checked={getAssetItem(id)?.exchangeRateState}
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
            {tip && (


                <TooltipComponent
                    id={`checkbox-tooltip-${id}`}
                    place="right"
                    content={tip}
                    style={{ backgroundColor: "#333", color: "#fff", padding: "8px", borderRadius: "4px" }}
                />

            )
            }
        </div>
    );
}

export default Checkbox;