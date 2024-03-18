// External Dependencies.
import React, { useState, useEffect } from 'react';

// Internal Dependencies.
import { ICONS } from '../icons';
import './style.scss';

const MegaMenu = ( { options, parent, menu, onClick } ) => {
	const [ toggle, setToggle ] = useState( false );
	const [ visibleOptions, setVisibleOptions ] = useState( [] );

	useEffect( () => {
		if ( ! options ) {
			return;
		}

		const updateVisibleOptions = () => {
			const width = window.innerWidth;

			if ( width >= 1116 ) {
				setVisibleOptions( options.slice( 0, 9 ) );
			} else if ( width < 1116 && width >= 1025 ) {
				setVisibleOptions( options.slice( 0, 6 ) );
			} else if ( width < 1025 && width >= 950 ) {
				setVisibleOptions( options.slice( 0, 5 ) );
			} else if ( width < 950 && width >= 751 ) {
				setVisibleOptions( options.slice( 0, 4 ) );
			} else if ( width < 751 && width >= 451 ) {
				setVisibleOptions( options.slice( 0, 3 ) );
			}
		};

		updateVisibleOptions();

		const handleResize = () => {
			updateVisibleOptions();
		};

		window.addEventListener( 'resize', handleResize );

		return () => {
			window.removeEventListener( 'resize', handleResize );
		};
	}, [ options ] );

	return (
		<div
			className={ `stc-mega-menu-wrap ${
				toggle ? 'stc-mega-menu-show' : ''
			}` }
		>
			<div
				className="stc-mega-menu-toggle"
				onClick={ () => {
					setToggle( ! toggle );
				} }
			>
				{ ICONS.toggle }
			</div>

			<div className="stc-mega-menu-container">
				<div className="stc-mega-menu">
					{ visibleOptions.map( ( option ) => {
						return (
							<div
								key={ option.ID }
								className={ `stc-mega-menu-item ${
									parent === option.ID ||
									( menu === option.ID &&
										parent === option.ID )
										? 'stc-mega-menu-item-active'
										: ''
								}` }
							>
								<span
									className="stc-mega-menu-item-title"
									onClick={ ( event ) => {
										if ( 'function' === typeof onClick ) {
											event.stopPropagation();
											event.preventDefault();
											onClick( event, option, option );
										}
									} }
								>
									{ option.title }
									{ ICONS.dropdown }
								</span>

								{ option.children &&
									option.children.length > 0 && (
									<div
										className={ `stc-mega-menu-group stc-mega-menu-group-col-${ option.children.length }` }
									>
										{ option.children.map(
											( child ) => {
												return (
													<div
														key={ child.ID }
														className="stc-mega-menu-section"
													>
														<span className="stc-mega-menu-section-title">
															{ child.title }
														</span>
														{ child.children &&
														child.children.length > 0 && (
															<div className="stc-mega-menu-children">
																{ child.children.map(
																	(
																		childItem
																	) => {
																		return (
																			<div
																				className={ `stc-mega-menu-child-item ${
																					menu ===
																							childItem.ID
																						? 'stc-mega-menu-child-item-active'
																						: ''
																				}` }
																				key={
																					childItem.ID
																				}
																				onClick={ (
																					event
																				) => {
																					if (
																						'function' ===
																								typeof onClick
																					) {
																						event.stopPropagation();
																						onClick(
																							event,
																							option,
																							childItem
																						);
																					}
																				} }
																			>
																				{
																					childItem.title
																				}
																			</div>
																		);
																	}
																) }
															</div>
														) }
													</div>
												);
											}
										) }
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			</div>
		</div>
	);
};

export default MegaMenu;
