// External Dependencies.
import React, { useState } from 'react';

// Internal Dependencies.
import './style.scss';

const MegaMenu = ( { options, value, onClick } ) => {

	if( ! options ) {
		return '';
	}

	let [toggle, setToggle] = useState( false );

	return (
		<div className={`stc-mega-menu-wrap ${ toggle ? 'stc-mega-menu-show' : '' }`}>

			<div className='stc-mega-menu-toggle' onClick={()=>{
				setToggle( ! toggle );
			}}>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 2.05556C0.723858 2.05556 0.5 2.27941 0.5 2.55556C0.5 2.8317 0.723858 3.05556 1 3.05556V2.05556ZM15 3.05556C15.2761 3.05556 15.5 2.8317 15.5 2.55556C15.5 2.27941 15.2761 2.05556 15 2.05556V3.05556ZM1 7.5C0.723858 7.5 0.5 7.72386 0.5 8C0.5 8.27614 0.723858 8.5 1 8.5V7.5ZM15 8.5C15.2761 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.2761 7.5 15 7.5V8.5ZM1 12.9444C0.723858 12.9444 0.5 13.1683 0.5 13.4444C0.5 13.7206 0.723858 13.9444 1 13.9444V12.9444ZM15 13.9444C15.2761 13.9444 15.5 13.7206 15.5 13.4444C15.5 13.1683 15.2761 12.9444 15 12.9444V13.9444ZM1 3.05556H4.11111V2.05556H1V3.05556ZM15 2.05556H7.22222V3.05556H15V2.05556ZM1 8.5H10.3333V7.5H1V8.5ZM15 7.5H13.4444V8.5H15V7.5ZM1 13.9444H2.55556V12.9444H1V13.9444ZM15 12.9444H5.66667V13.9444H15V12.9444ZM6.72222 2.55556C6.72222 3.13852 6.24963 3.61111 5.66667 3.61111V4.61111C6.80192 4.61111 7.72222 3.69081 7.72222 2.55556H6.72222ZM5.66667 3.61111C5.0837 3.61111 4.61111 3.13852 4.61111 2.55556H3.61111C3.61111 3.69081 4.53141 4.61111 5.66667 4.61111V3.61111ZM4.61111 2.55556C4.61111 1.97259 5.0837 1.5 5.66667 1.5V0.5C4.53141 0.5 3.61111 1.4203 3.61111 2.55556H4.61111ZM5.66667 1.5C6.24963 1.5 6.72222 1.97259 6.72222 2.55556H7.72222C7.72222 1.4203 6.80192 0.5 5.66667 0.5V1.5ZM12.9444 8C12.9444 8.58297 12.4719 9.05556 11.8889 9.05556V10.0556C13.0241 10.0556 13.9444 9.13525 13.9444 8H12.9444ZM11.8889 9.05556C11.3059 9.05556 10.8333 8.58297 10.8333 8H9.83333C9.83333 9.13525 10.7536 10.0556 11.8889 10.0556V9.05556ZM10.8333 8C10.8333 7.41703 11.3059 6.94444 11.8889 6.94444V5.94444C10.7536 5.94444 9.83333 6.86475 9.83333 8H10.8333ZM11.8889 6.94444C12.4719 6.94444 12.9444 7.41703 12.9444 8H13.9444C13.9444 6.86475 13.0241 5.94444 11.8889 5.94444V6.94444ZM5.16667 13.4444C5.16667 14.0274 4.69408 14.5 4.11111 14.5V15.5C5.24636 15.5 6.16667 14.5797 6.16667 13.4444H5.16667ZM4.11111 14.5C3.52814 14.5 3.05556 14.0274 3.05556 13.4444H2.05556C2.05556 14.5797 2.97586 15.5 4.11111 15.5V14.5ZM3.05556 13.4444C3.05556 12.8615 3.52814 12.3889 4.11111 12.3889V11.3889C2.97586 11.3889 2.05556 12.3092 2.05556 13.4444H3.05556ZM4.11111 12.3889C4.69408 12.3889 5.16667 12.8615 5.16667 13.4444H6.16667C6.16667 12.3092 5.24636 11.3889 4.11111 11.3889V12.3889Z" />
				</svg>
			</div>

			<div className="stc-mega-menu">
				{
					options.map( ( option ) => {
						return (
							<div
								key={ option.ID }
								dataId={option.ID}
								className={`stc-mega-menu-item ${ value === option.ID ? 'stc-mega-menu-item-active' : ''}`}
							>
								<span className='stc-mega-menu-item-title'>
									{ option.title }
									<svg className='stc-mega-menu-item-icon' width="8" height="6" viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.57737 5.15134L0.176305 1.64053C-0.0587684 1.39787 -0.0587684 1.00549 0.176305 0.765408L0.741482 0.181994C0.976555 -0.0606647 1.35667 -0.0606647 1.58925 0.181994L4 2.67054L6.41075 0.181994C6.64583 -0.0606647 7.02595 -0.0606647 7.25852 0.181994L7.8237 0.765408C8.05877 1.00807 8.05877 1.40045 7.8237 1.64053L4.42263 5.15134C4.19256 5.394 3.81244 5.394 3.57737 5.15134Z" />
									</svg>
								</span>

								{
									option.children && option.children.length > 0 && (
										<div className={`stc-mega-menu-group stc-mega-menu-group-col-${option.children.length}`}>
											{
												option.children.map( ( child ) => {
													return (
														<div className="stc-mega-menu-section">
															<span className='stc-mega-menu-section-title'>{ child.title }</span>
															{
																child.children && child.children.length > 0 && (
																	<div className="stc-mega-menu-children">
																		{
																			child.children.map( ( childItem ) => {
																				return (
																					<div
																						className="stc-mega-menu-child-item"
																						key={ childItem.ID }
																						onClick={ (event) => {
																							console.log( 'clicked' );
																							if( 'function' === typeof onClick ) {
																								onClick( event, option, childItem );
																							}
																						}}
																					>
																						{ childItem.title }
																					</div>
																				);
																			} )
																		}
																	</div>
																)
															}
														</div>
													);
												} )
											}
										</div>
									)
								}
							</div>
						);
					} )
				}
			</div>
		</div>
	)
};

export default MegaMenu;
