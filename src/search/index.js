// External Dependencies.
import React, { memo, useEffect, useCallback, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { __ } from '@wordpress/i18n';

// Internal Dependencies.
import './style.scss';
import { ICONS } from '../icons';

const Search = ( {
	apiUrl,
	onSearchResult,
	beforeSearchResult,
	onSearch,
	value,
	placeholder,
	onKeyUp,
} ) => {
	const searchPlaceholder = placeholder ? placeholder : __( 'Search..' );
	const inputRef = useRef( null );

	const debounced = useDebouncedCallback(
		// to memoize debouncedFunction we use useCallback hook.
		// In this case all linters work correctly
		useCallback(
			( searchedText ) => {
				if ( typeof beforeSearchResult === 'function' ) {
					beforeSearchResult();
				}

				// Avoid the API call if the searchedText is empty.
				if ( ! searchedText ) {
					onSearchResult( {}, searchedText );
					return;
				}

				fetch( apiUrl )
					.then( ( res ) => res.json() )
					.then( ( response ) => {
						if ( typeof onSearchResult === 'function' ) {
							onSearchResult( response, searchedText );
						}
					} );
			},
			[ value ]
		),
		300,
		// The maximum time func is allowed to be delayed before it's invoked:
		{ maxWait: 2000 }
	);

	useEffect( () => {
		if ( apiUrl ) {
			debounced( value );
		}

		if ( value ) {
			inputRef.current.focus();
		}
	}, [ value ] );

	return (
		<div
			className={ `stc-search ${ value ? 'stc-search-have-input' : '' }` }
		>
			<input
				ref={ inputRef }
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
