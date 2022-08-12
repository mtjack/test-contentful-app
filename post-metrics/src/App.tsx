import React, {useMemo} from 'react';
import {locations} from "@contentful/app-sdk";
import ConfigScreen from "./locations/ConfigScreen";
import Field from "./locations/Field";
import EntryEditor from "./locations/EntryEditor";
import Dialog from "./locations/Dialog";
import Sidebar from "./locations/Sidebar";
import Page from "./locations/Page";
import {useSDK, useCMA} from "@contentful/react-apps-toolkit";
import { SidebarExtensionSDK } from '@contentful/app-sdk';

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_ENTRY_FIELD]: Field,
  [locations.LOCATION_ENTRY_EDITOR]: EntryEditor,
  [locations.LOCATION_DIALOG]: Dialog,
  [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
  [locations.LOCATION_PAGE]: Page,
}

const App = () => {
  const sdk: SidebarExtensionSDK = useSDK()
  const cma = useCMA()

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location])

  return Component ? <Component sdk={sdk} cma={cma}/> : null

};

export default App;
