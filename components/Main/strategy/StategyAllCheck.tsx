import React from 'react'

import { useAssetStore } from '@/store/assetsStore';
import Checkbox from '@/components/ui/CheckBox';


/**
 * 전체 자산의 환율 반영 상태를 관리하는 체크박스 컴포넌트
 * 음 
 */
const StategyAllCheck = () => {
    const assetList = useAssetStore(state => state.assetList);
    const { allCheck, updateAllCheck } = useAssetStore(state => state.actions);
    return (
        <Checkbox
            id='전체 환율 반영' label='전체 환율 반영'
            tip=''
            checked={allCheck(assetList)}
            onChange={updateAllCheck}
        />
    )
}

export default StategyAllCheck