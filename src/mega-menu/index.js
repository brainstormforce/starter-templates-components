import React, { useState, useEffect } from 'react';
import './style.scss'; // Import your CSS file with styles
import { ICONS } from '../icons';

const MegaMenu = ( { options, parent, menu, onClick } ) => {
	const [ toggle, setToggle ] = useState( false );
	const [ visibleOptions, setVisibleOptions ] = useState( [] );

	useEffect( () => {
		const updateVisibleOptions = () => {
			const width = window.innerWidth;
			if ( width >= 1116 ) {
				setVisibleOptions( options );
			} else if ( width < 1116 && width >= 1025 ) {
				setVisibleOptions( options.slice( 0, 5 ) );
			} else if ( width < 1025 && width >= 950 ) {
				setVisibleOptions( options.slice( 0, 4 ) );
			} else if ( width < 950 && width >= 751 ) {
				setVisibleOptions( options.slice( 0, 3 ) );
			} else if ( width < 751 && width >= 451 ) {
				setVisibleOptions( options.slice( 0, 2 ) );
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

	const moreOptions = options.slice( visibleOptions.length ); // Calculate the remaining options beyond visible options.

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
										if ( typeof onClick === 'function' ) {
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
																child.children
																	.length >
																	0 && (
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
																								typeof onClick ===
																								'function'
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
					{ /* Render "More" menu item only if there are more options */ }
					{ moreOptions.length > 0 && (
						<div
							className={ `stc-mega-menu-item ${
								toggle ? 'stc-mega-menu-item-active' : ''
							}` }
						>
							<span
								className="stc-mega-menu-item-title"
								onClick={ ( event ) => {
									if ( typeof onClick === 'function' ) {
										event.stopPropagation();
										event.preventDefault();
										onClick(
											event,
											moreOptions,
											moreOptions
										);
									}
								} }
							>
								More
								{ ICONS.dropdown }
							</span>
							<div
								className={ `stc-mega-menu-more-group stc-mega-menu-group-col-1` }
							>
								{ moreOptions.map( ( option ) => (
									<div
										key={ option.ID }
										className={ `stc-mega-more-menu-section` }
									>
										<span className="stc-mega-menu-item-title stc-mega-more-menu-item-title">
											{ option.title }
											{ ICONS.dropdown }
										</span>
										{ option.children &&
											option.children.length > 0 && (
												<div
													className={ `stc-mega-menu-group stc-more-group stc-mega-menu-group-col-1` }
												>
													{ option.children.map(
														( child ) => {
															return (
																<div
																	key={
																		child.ID
																	}
																	className="stc-mega-menu-section"
																>
																	<span className="stc-mega-menu-section-title">
																		{
																			child.title
																		}
																	</span>
																	{ child.children &&
																		child
																			.children
																			.length >
																			0 && (
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
																										typeof onClick ===
																										'function'
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
								) ) }
							</div>
						</div>
					) }
				</div>
			</div>
		</div>
	);
};

export default MegaMenu;
