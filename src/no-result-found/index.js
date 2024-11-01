/** External dependencies */
import React from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf, __ } from '@wordpress/i18n';

// Internal dependencies
import './style.scss';

const NoResultFound = ( { searchTerm, siteCount } ) => {
	if ( ! searchTerm && ! siteCount ) {
		return (
			<div className="stc-sites-no-results">
				<h4>{ __( 'No Sites found!' ) }</h4>
			</div>
		);
	}

	return (
		<div className="stc-sites-no-results">
			<h4>
				{ sprintf(
					/* translators: %1$s - search term. */
					__(
						'Your search - %1$s - did not match any Starter Templates.'
					),
					decodeEntities( searchTerm )
				) }
			</h4>
		</div>
	);
};

export default NoResultFound;
