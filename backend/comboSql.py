import sqlite3;
import os;

class Database(): 

    def __init__(self, reset=False): 
        if(reset == True and os.path.exists('database.db')):
            os.remove('database.db')
        self.create_tables()

    def __setitem__(self, table, values):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        tempString = "( " + "?, "* (len(values)-1) + "?)"

        cursor.execute(f"""INSERT
                           INTO     {table}
                           VALUES   {tempString} ;""", values)

        connect.commit()
        connect.close()

    def create_tables(self): 
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        # If we can figure out a method to use the schema.sql, we can replace it here, otherwise we will follow previous style
        cursor.execute(""" CREATE TABLE IF NOT EXISTS Events (
                      EVENT_ID          INTEGER     PRIMARY KEY     AUTOINCREMENT,
                      TITLE             TEXT        NOT NULL,
                      START_TIME        INTEGER     NOT NULL,
                      END_TIME          INTEGER     NOT NULL,
                      LOCATION          TEXT        NOT NULL,
                      DESCRIPTION       TEXT        NOT NULL,
                      MAX_ATTENDEES     INTEGER     NOT NULL,
                      MAX_VOLUNTEERS    INTEGER,
                      WELLNESS_TYPE     TEXT,
                      ISONLINE          BOOLEAN     NOT NULL,
                      ORGANIZER_ID      INTEGER     NOT NULL,
                      COST              INTEGER,
                      IMAGE             TEXT );""")
        

        cursor.execute(""" CREATE TABLE IF NOT EXISTS EventBookings (
                       EVENT_ID         INTEGER    NOT NULL,
                       USER_ID          INTEGER    NOT NULL,
                       TYPE             TEXT );""")


        cursor.execute(""" CREATE TABLE IF NOT EXISTS Accounts (
                       USER_ID          INTEGER     PRIMARY KEY    AUTOINCREMENT,
                       EMAIL            BLOB        NOT NULL,
                       PASSWORD         TEXT        NOT NULL, 
                       FNAME            TEXT        NOT NULL,
                       LNAME            TEXT        NOT NULL );""")

        connect.commit()
        connect.close()
        
    def get_events(self):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()

        eventData = cursor.execute(""" SELECT * FROM Events;""").fetchall()
        #eventData = cursor.fetchall() # this is a python dictionary, need to convert it to JSON in the server.py file

        connect.close()
        return eventData
    
    def add_event(self, eventInfo):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        tempString = "( " + "?, "*12 + "?)"
        tempValue = [None]
        for values in eventInfo.values():
            tempValue.append(values)

        cursor.execute(f""" INSERT INTO Events
                            VALUES  {tempString} ;""", tempValue)

        userID = cursor.execute(f""" SELECT EVENT_ID FROM Events 
                                        WHERE TITLE = "{eventInfo['title']}" """).fetchone()
        
        connect.commit()
        connect.close()

        return userID
    def delete_event(self, eventID):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()
        
        event = cursor.execute(f""" SELECT * FROM Events WHERE EVENT_ID='{eventID}';""").fetchone()

        if event:
            cursor.execute(f""" DELETE FROM Events WHERE EVENT_ID='{eventID}';""")
            connect.commit()
            connect.close()
            return True
        else:
            connect.commit()
            connect.close()
            return False
        
    def select_booking(self, userID):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()

        table = cursor.execute(f""" SELECT * FROM EventBookings
                                         WHERE USER_ID = {userID};""").fetchall()
        
        print(table)
        connect.commit()
        connect.close()

        return table
    def delete_booking(self, userID, eventID):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor()

        event = cursor.execute(f""" SELECT * FROM EventBookings WHERE EVENT_ID='{eventID}' AND USER_ID='{userID};""").fetchone()
        print(event)

        if event:
            cursor.execute(f""" DELETE FROM EventBookings WHERE EVENT_ID='{eventID}' AND USER_ID='{userID}';""")
            connect.commit()
            connect.close()
            return True
        else:
            connect.commit()
            connect.close()
            return False

        

    def select_account(self, credentials):
        connect = sqlite3.connect('database.db')
        cursor = connect.cursor() 

        table = cursor.execute(f""" SELECT * FROM Accounts
                                        WHERE EMAIL =  "{credentials['email']}"
                                        AND PASSWORD = "{credentials['password']}";""").fetchone()
        
        
        # Here we return a fake accoun for sake of the minimum viable product
        if table == None:
            return (1, "Bryan","Wang")
        
        connect.close()
        return (table[0], table[3], table[4])
            


        
#TESTING PURPOSES ONLY
# db = Database(reset=True)
# db.add_event({'title': "someTitle", 'startTime': 5, 'endTime': 5, 'location': "location", 'description': "description1", 'maxAttendees': 4, 'maxVolunteers': 5, 'wellnessType': "Well", 'isOnline': True, 'organized_id': 20, 'cost': 40, 'image': "string"})

# db.__setitem__("EventBookings", (1, 2, "Attendee"))
# db.__setitem__("EventBookings", (4, 2, "Volunteer"))
# db.__setitem__("EventBookings", (2, 3, "Volunteer"))
# x = 0

# db.select_booking(2)



        
        



