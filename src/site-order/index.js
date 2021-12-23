import React, { memo } from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleDropdown } from '../index.js';

const SiteOrder = ({ value, onClick }) => {
	return (
		<ToggleDropdown
			className="stc-site-order-filter"
			value={value}
			options={[
				{
					id: 'popular',
					title: __('Popular', 'astra-sites'),
				},
				{
					id: 'latest',
					title: __('Latest', 'astra-sites'),
				},
			]}
			onClick={(event, order) => {
				if ('function' === typeof onClick) {
					onClick(event, order);
				}
			}}
		/>
	);
};

export default memo(SiteOrder);
