import React from 'react';
import { __ } from '@wordpress/i18n';

const PremiumBadge = ( { badge } ) => {
	return (
		<span className="stc-grid-item-badge">
			{ badge ? badge : __( 'Premium', 'astra-sites' ) }
		</span>
	);
};
export default PremiumBadge;
