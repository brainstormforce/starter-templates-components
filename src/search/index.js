// External Dependencies.
import React, { memo, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { useDebouncedCallback } from 'use-debounce';

// Internal Dependencies.
import './style.scss';
import { ICONS } from '../icons';

const Search = ( { apiUrl, onSearchResult, beforeSearchResult, onSearch, value, placeholder, onKeyUp } ) => {
	const searchPlaceholder = placeholder
		? placeholder
		: __( 'Search..' );

	const debounced = useDebouncedCallback(
		// to memoize debouncedFunction we use useCallback hook.
		// In this case all linters work correctly
		useCallback( ( value ) => {
			if( typeof beforeSearchResult === 'function' ) {
				beforeSearchResult();
			}

			fetch( apiUrl )
			.then( ( res ) => res.json() )
			.then( ( response ) => {
				if( typeof onSearchResult === 'function' ) {
					onSearchResult( response, value );
				}
			} );
		}, [ value ] ),
		300,
		// The maximum time func is allowed to be delayed before it's invoked:
		{ maxWait: 2000 }
	);

	useEffect( () => {
		if( apiUrl ) {
			debounced( value );
		}
	}, [ value ] );

	return (
		<div
			className={ `stc-search ${ value ? 'stc-search-have-input' : '' }` }
		>
			<input
				className="stc-search-input"
				type="search"
				value={ value }
				placeholder={ searchPlaceholder }
				onChange={ ( event ) => {
					if ( 'function' === typeof onSearch ) {
						onSearch( event, event.target.value );
					}
				} }
				onKeyUp={ ( event ) => {
					if ( 'function' === typeof onKeyUp ) {
						onKeyUp( event );
					}
				} }
			/>
			<button className="stc-search-icon">{ ICONS.search }</button>
			<button
				className="stc-cross-icon"
				onClick={ ( event ) => {
					if ( 'function' === typeof onSearch ) {
						onSearch( event, '' );
						document
							.getElementsByClassName( 'stc-search-input' )[ 0 ]
							.focus();
					}
				} }
			>
				{ ICONS.cross }
			</button>
		</div>
	);
};

export default memo( Search );
