import TooltipComponent from "./TooltipComponent";


interface CheckboxProps {
    id: string;
    label: string;
    tip?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}
const Checkbox = ({ id, label, tip, checked, onChange, }: CheckboxProps) => {
    console.log('Checkbox', label)
    const handleChange = () => {
        onChange(!checked);
    };
    return (
        <div className="flex items-center w-fit gap-2">
            <label
                htmlFor={id}
                className="flex items-center gap-2 w-fit cursor-pointer"
                style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#fff",
                }}
            >
                {/* 숨겨진 기본 체크박스 */}
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
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

                <span className="text-nowrap text-white text-sm">{label}</span>
            </label>
            {tip && (
                <TooltipComponent
                    id={`checkbox-tooltip-${id}`}
                    content={tip}
                />
            )}
        </div>
    );
}

export default Checkbox;