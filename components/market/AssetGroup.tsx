import React from 'react'
import AssetType from '../Main/asset/AssetType';
import AssetSearchBox from '../Main/asset/AssetSearchBox';
import AssetWeight from '../Main/asset/AssetWeight';
import AssetCheckBox from '../Main/asset/AssetCheckBox';



interface AssetGroupProps {
    id: string;

}
const AssetGroup = ({ id }: AssetGroupProps) => {
    return (
        <div>
            <section className='flex gap-6 flex-1'>
                <AssetType id={id} />
                <AssetSearchBox id={id} />
                <AssetWeight id={id} />
            </section>
            <AssetCheckBox id={id} />
        </div>
    )
}

export default AssetGroup