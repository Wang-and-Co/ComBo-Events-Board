export const USER_TYPES = {
  VOLUNTEER: 'Volunteer',
  ATTENDEE: 'Attendee',
  HOST: 'Host',
};

export const getRegistrationTypeMessage = (userType) =>
  ({
    Volunteer: 'Volunteering',
    Attendee: 'Attending',
    Host: 'Hosting',
    None: null,
  })[userType];

export const getRegistrationTypeColour = (userType) =>
  ({
    Volunteer: 'attendee',
    Attendee: 'volunteer',
    Host: 'host',
    None: 'primary',
  })[userType];
