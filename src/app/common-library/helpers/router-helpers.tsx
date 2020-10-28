import * as utils from "./local-storage-helpers";
import {GetStorage, RemoveStorage} from "./local-storage-helpers";

const localStorageLastLocationKey = "metronic-lastLocation";

function AcceptLocation(lastLocation: any) {
  if (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== "/" &&
    lastLocation.pathname.indexOf("auth") === -1 &&
    lastLocation.pathname !== "/logout"
  ) {
    return true;
  }
  
  return false;
}

export function SaveLastLocation(lastLocation: any) {
  if (AcceptLocation(lastLocation)) {
    utils.setStorage(
      localStorageLastLocationKey,
      JSON.stringify(lastLocation),
      120
    );
  }
}

export function ForgotLastLocation() {
  RemoveStorage(localStorageLastLocationKey);
}

export function getLastLocation() {
  const defaultLocation = {pathname: "/", title: "Dashboard"};
  const localStorateLocations = GetStorage(localStorageLastLocationKey);
  if (!localStorateLocations) {
    return {pathname: "/", title: "Dashboard"};
  }
  try {
    return JSON.parse(localStorateLocations);
  } catch (error) {
    console.error(error);
    return defaultLocation;
  }
}

export function GetCurrentUrl(location: any) {
  return location.pathname.split(/[?#]/)[0];
}

export function CheckIsActive(location: any, url: any) {
  const current = GetCurrentUrl(location);
  if (!current || !url) {
    return false;
  }
  if (current === url) {
    return true;
  }
  return current.indexOf(url) > -1;
}
