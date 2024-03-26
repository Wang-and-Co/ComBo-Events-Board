import { Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarRight from '../../shared-components/Navigation/SidebarRight';
import { useEffect, useState } from 'react';
import MyEventsStack from '../../shared-components/Navigation/MyEventsStack';
import EventDescription from '../../shared-components/event-display/EventDescription';
import EventsGrid from '../../shared-components/Navigation/EventsGrid';
import * as sampleEvents from '../../stories/sampleEvents.js';
import useAuth from '../../shared-components/hooks/useAuth.js';
import useAsyncResponse from '../../shared-components/axios/useAsyncResponse.js';
import { retrieveEvents } from '../../app/api/events.js';
import { getEventsFromAPIResponse } from './utils.js';

const SIDEBAR_RIGHT_WIDTH_PERCENT = 25;
const HomePage = () => {
  const { callAsyncFunction, callAsyncFunctionPromise, isLoading } =
    useAsyncResponse(
      retrieveEvents,
      (events) => {
        console.log('Got displayed events!', events);
        setDisplayedEvents(getEventsFromAPIResponse(events));
      },
      (err) => {
        console.log('Failed to get displayed events:', err);
      },
    );
  const { isLoggedIn, setAuthInfo, handleLogout } = useAuth();
  const sidebarWidthToUse = isLoggedIn ? SIDEBAR_RIGHT_WIDTH_PERCENT + 10 : 3;

  const [displayedEvents, setDisplayedEvents] = useState([
    sampleEvents.attendingEvent,
    sampleEvents.hostingEvent,
    sampleEvents.volunteeringEvent,
    sampleEvents.unregisteredEvent,
  ]);
  const [registeredEvents, setRegisteredEvents] = useState([
    sampleEvents.attendingEvent,
    sampleEvents.hostingEvent,
    sampleEvents.volunteeringEvent,
  ]);
  const [currentViewedEvent, setCurrentViewedEvent] = useState(null);

  // UseEffects

  useEffect(() => {
    if (isLoggedIn) {
      callAsyncFunction();
    } else {
      callAsyncFunction();
    }
  }, []);
  // Returning the component
  return (
    <Box width={`${100 - sidebarWidthToUse}%`} sx={{ marginLeft: 2 }}>
      <Typography variant="h5" align="left">
        Welcome to ComBo Community Board!
      </Typography>
      <Typography variant="h6" align="left">
        Click an event to view more information about it.
      </Typography>
      <EventsGrid
        events={displayedEvents}
        eventDetailsOpenFunc={setCurrentViewedEvent}
      />
      {isLoggedIn ? (
        <SidebarRight widthPercent={SIDEBAR_RIGHT_WIDTH_PERCENT}>
          {currentViewedEvent == null ? (
            <MyEventsStack
              events={registeredEvents}
              eventDetailsOpenFunc={setCurrentViewedEvent}
            />
          ) : (
            <EventDescription
              closeFunc={() => {
                setCurrentViewedEvent(null);
              }}
              event={currentViewedEvent}
            />
          )}
        </SidebarRight>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default HomePage;
