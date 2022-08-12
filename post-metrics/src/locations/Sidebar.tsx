import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { List, ListItem, Note } from '@contentful/f36-components'
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import readingTime from 'reading-time';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  cma: PlainClientAPI;
}

const CONTENT_FIELD_ID = 'content';
const READING_TIME = 'readingTime';

const Sidebar = (props: SidebarProps) => {

  const { sdk } = props;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const readingTimeField = sdk.entry.fields[READING_TIME];

  const [logText, setLogText] = useState(contentField.getValue());

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setLogText(value);
      readingTimeField.setValue(readingTime(value || '').minutes)
    });

    return () => detach();
  }, [contentField]);

  const stats = readingTime(logText || '');

  return (
    <>
      <Note>
        Metrics for log entry:
        <List>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.minutes} minutes</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;