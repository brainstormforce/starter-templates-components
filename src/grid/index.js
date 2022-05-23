// External Dependencies.
import React from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

// Internal Dependencies.
import { ICONS } from '../icons';
import './style.scss';
import Tooltip from '../tooltip';
import { PremiumBadge } from '..';

// Grid Component
const Grid = ( {
	className,
	column,
	options,
	onClick,
	hasFavorite,
	onFavoriteClick,
	favoriteList,
	buttonLabel,
	enableNewUi,
} ) => {
	if ( ! options.length ) {
		return '';
	}

	return (
		<div
			className={ `
				stc-grid-wrap				
				grid-${ column || '3' }
				${ className ?? '' }
			` }
			column={ column }
		>
			{ options.map( ( item, index ) => {
				const isFavorite =
					favoriteList && favoriteList.length
						? favoriteList.includes( `id-${ item.id }` )
						: false;

				const screenshotStyle = {};
				if ( item.image ) {
					screenshotStyle.backgroundImage = `url(${ item.image })`;
				}

				return (
					<div
						className={ `stc-grid-item` }
						data-id={ item.id }
						key={ index }
					>
						<div className="stc-grid-item-inner">
							{ item.badge ? (
								<PremiumBadge badge={ item.badge } />
							) : null }

							{ enableNewUi ? (
								<div className="stc-grid-item-screenshot-wrap">
									<a href={ item.link } rel="noreferrer">
										<div
											className="stc-grid-item-screenshot"
											style={ screenshotStyle }
										/>
										<div className="stc-grid-item-blur" />
									</a>
								</div>
							) : (
								<div
									className="stc-grid-item-screenshot"
									style={ screenshotStyle }
									onClick={ ( event ) => {
										if ( 'function' === typeof onClick ) {
											onClick( event, item );
										}
									} }
								/>
							) }

							<div className="stc-grid-item-header">
								<div className="stc-grid-item-title">
									{ decodeEntities( item.title ) }
								</div>

								{ item.desc ? (
									<div className="stc-grid-item-desc">
										{ item.desc.substring( 0, 100 ) }
									</div>
								) : null }

								{ !! item?.link && ! enableNewUi ? (
									<div className="stc-grid-item-hover-button-wrap">
										<a
											className="stc-grid-item-hover-button"
											href={ item.link }
											target="_blank"
											rel="noreferrer"
										>
											{ buttonLabel }
										</a>
									</div>
								) : null }

								{ hasFavorite ? (
									<Tooltip
										content={ `${
											! isFavorite
												? __( 'Add to favorites' )
												: ''
										}` }
									>
										<div
											className={ `stc-grid-favorite ${
												isFavorite ? 'active' : ''
											}` }
											onClick={ ( event ) => {
												if (
													'function' ===
													typeof onFavoriteClick
												) {
													onFavoriteClick(
														event,
														item,
														! isFavorite
													);
												}
											} }
										>
											{ ICONS.favorite }
										</div>
									</Tooltip>
								) : null }
							</div>

							{ enableNewUi ? (
								<div className="stc-grid-item-hover-button-wrapper">
									<div
										className="st-template-page-builder-wrap"
										dangerouslySetInnerHTML={ {
											__html: item.pageBuilder,
										} }
									/>
									<div className="stc-grid-item-hover-button-wrap">
										<a
											className="stc-grid-item-hover-button"
											href={ item.link }
											rel="noreferrer"
										>
											{ buttonLabel }
										</a>
									</div>
								</div>
							) : null }
						</div>
					</div>
				);
			} ) }
		</div>
	);
};

export default Grid;
