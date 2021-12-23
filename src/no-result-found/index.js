/** External dependencies */
import React from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf, __ } from '@wordpress/i18n';

// Internal dependencies
import './style.scss';

const NoResultFound = ({searchTerm}) => {

	if (!searchTerm) {
		return null;
	}

	return (
		<div className="stc-sites-no-results">
			<h4>
				{sprintf(
					/* translators: %1$s - search term. */
					__(
						'Your search - %1$s - did not match any Starter Templates.',
						'astra-sites-showcase'
					),
					decodeEntities(searchTerm)
				)}
			</h4>
		</div>
	);
};

export default NoResultFound;
