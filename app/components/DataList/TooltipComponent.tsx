import React from 'react'
import { Tooltip } from 'react-tooltip'
interface TooltipComponentProps {
    id: string;
    place: 'top' | 'bottom' | 'left' | 'right';
    content: string;
    style?: React.CSSProperties;
}
const TooltipComponent = ({ id, place, content, style }: TooltipComponentProps) => {
    return (
        <div>

            <span data-tooltip-id={id} className="cursor-help ml-1 flex items-center">
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
                id={id}
                place={place}
                content={content}
                style={style}
            />
        </div>
    )
}

export default TooltipComponent