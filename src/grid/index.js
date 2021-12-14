// External Dependencies.
import React from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import Skeleton from '@material-ui/lab/Skeleton';

// Internal Dependencies.
import { ICONS } from '../icons';
import './style.scss';
import Tooltip from '../tooltip';

// Grid Component
const Grid = ( {
	skeleton,
	className,
	column,
	options,
	onClick,
	hasFavorite,
	onFavoriteClick,
	favoriteList,
} ) => {

	let hasSkeleton = skeleton ? skeleton : false;

	return (
		<div
			className={ `
				stc-grid-wrap
				grid-${ column || '3' }
				${ className ?? '' }
			` }
			column={ column }
		>
			{
				hasSkeleton ? (
					<>
						{
							[1, 2, 3, 4].map( (index) => {
								return (
									<div className="stc-grid-item" key={ index }>
										<div className="stc-grid-item-inner">
											<div className="stc-grid-item-screenshot" />
											<div className="stc-grid-item-header">
												<div className="stc-grid-item-title">
													<Skeleton
														variant="rect"
														width={ 100 }
														height={ 20 }
														animation="wave"
													/>
												</div>

												{
													hasFavorite && (
														<div className='stc-grid-favorite'>
															{ ICONS.favorite }
														</div>
													)
												}
											</div>
										</div>
									</div>
								);
							})
						}
					</>
				) : (
					<>
					{
						options.length ? (
							<>
								{ options.map( ( item, index ) => {
									const isFavorite = favoriteList && favoriteList.length ? favoriteList.includes( `id-${ item.id }` ) : false;

									return (
										<div className="stc-grid-item" key={ index }>
											<div className="stc-grid-item-inner">
												{ item.badge ? (
													<div className="stc-grid-item-badge">
														{ item.badge }
													</div>
												) : null }

												<div
													className="stc-grid-item-screenshot"
													style={ {
														backgroundImage: `url(${ item.image })`,
													} }
													onClick={ ( event ) => {
														if ( 'function' === typeof onClick ) {
															onClick( event, item );
														}
													} }
												/>

												<div className="stc-grid-item-header">
													<div className="stc-grid-item-title">
														{ decodeEntities( item.title ) }
													</div>

													{ hasFavorite ? (
														<Tooltip
															content={ `${
																! isFavorite
																	? __(
																			'Add to favorites',
																			'astra-sites'
																	)
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
											</div>
										</div>
									);
								} ) }
							</>
						) : (
							null
						) }
					</>
				)
			}

		</div>
	);
};

export default Grid;
