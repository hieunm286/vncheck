/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react';
import { Dropdown, Nav, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SVG from 'react-inlinesvg';
import objectPath from 'object-path';
import { DropdownTopbarItemToggler } from '../../../../../_metronic/_partials/dropdowns';
import { ToAbsoluteUrl } from '../../../../common-library/helpers/assets-helpers';
import { useHtmlClassService } from '../../../_core/metronic-layout';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationNavItem } from './user-notification-data';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {
  const [key, setKey] = useState('Events');
  const bgImage = ToAbsoluteUrl('/media/authImage/vegetable2.jpg');

  const uiService: any = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.notifications.layout') === 'offcanvas',
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-danger"
            id="kt_quick_notifications_toggle">
            <span className="svg-icon svg-icon-xl svg-icon-danger">
              <SVG src={ToAbsoluteUrl('/media/svg/icons/Code/Compiling.svg')} />
            </span>
            <span className="pulse-ring" />
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle as={DropdownTopbarItemToggler} id="kt_quick_notifications_toggle">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="user-notification-tooltip">Thông báo</Tooltip>}>
              <div
                className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-danger"
                id="kt_quick_notifications_toggle">
                <span className="svg-icon svg-icon-xl svg-icon-danger">
                  <NotificationsIcon htmlColor={'#0B9446'} />
                </span>
                <span className="pulse-ring" />
                <span className="pulse-ring" />
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
                <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white">Thông báo</span>
                  <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                    23 thông báo mới
                  </span>
                </h4>

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    onSelect={_key => setKey(_key ?? '')}>
                    {NotificationNavItem.map((navItem, index) => {
                      return (
                        <Nav.Item className={navItem._navClassName ?? ''} as="li">
                          <Nav.Link
                            eventKey={navItem.eventKey}
                            className={
                              navItem.className + `${key === navItem.eventKey ? ' active' : ''}`
                            }>
                            {navItem.label}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>

                  <Tab.Content className="tab-content">
                    {NotificationNavItem.map((navItem, key) => {
                      return navItem.data ? (
                        <Tab.Pane eventKey={navItem.eventKey} key={key}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className="navi navi-hover scroll my-4"
                            style={{ maxHeight: '300px', position: 'relative' }}>
                            {navItem.data.map((item, key) => {
                              return (
                                <a href="#" className="navi-item bg-hover">
                                  <div className="navi-link">
                                    <div className="navi-icon mr-2">{item.icon}</div>
                                    <div className="navi-text">
                                      <div className="font-weight-bold">
                                        {item.notificationName}
                                      </div>
                                      <div className="text-muted">{item.timestamp}</div>
                                    </div>
                                  </div>
                                </a>
                              );
                            })}
                          </PerfectScrollbar>
                        </Tab.Pane>
                      ) : (
                        <Tab.Pane eventKey={navItem.eventKey} className="p-8" key={key}>
                          Chưa có thông báo mới
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
