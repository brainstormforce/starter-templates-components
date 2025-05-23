import React, { memo } from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleDropdown } from '../index.js';

const SiteType = ( { value, onClick } ) => {
	return (
		<ToggleDropdown
			className="stc-site-type-filter"
			value={ value }
			options={ [
				{
					id: '',
					title: __( 'All' ),
				},
				{
					id: 'agency-mini',
					title: __( 'Premium' ),
				},
				{
					id: 'signature',
					title: __( 'Signature' ),
				},
			] }
			onClick={ ( event, type ) => {
				if ( 'function' === typeof onClick ) {
					onClick( event, type );
				}
			} }
		/>
	);
};

export default memo( SiteType );
