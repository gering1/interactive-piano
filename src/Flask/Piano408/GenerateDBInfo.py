import mysql.connector
#connect to db
cursor = db.cursor()
keyRecords =  [('A Major','Major',10,'Normal','123123412312345','543213214321321'),
               ('C Major','Major',1,'Normal','123123412312345','543213214321321'),
               ('D Major','Major',3,'Normal','123123412312345','543213214321321'),
               ('E Major','Major',5,'Normal','123123412312345','543213214321321'),
               ('F Major','Major',6,'Cluster','123412312341234','543213214321321'),
               ('B Major','Major',12,'Cluster','123123412312345','432143213214321'),
               ('G Major','Major',8,'Normal','123123412312345','543213214321321'),
               ('B♭ Major','Major',11,'Opposite 4/3','412312341231234','321432132143213'),
               ('E♭ Major','Major',4,'Matching 34s','312341231234123','321432132143213'),
               ('G♭ Major','Major',7,'Cluster','234123123412312','432132143213214'),
               ('D♭ Major','Major',2,'Cluster','231234123123412','321432132143213'),
               ('A♭ Major','Major',9,'Matching 3s','341231234123123','321432132143213'),
               ('D Minor','Minor',3,'Normal','123123412312345','543213214321321 '),
               ('A Minor','Minor',10,'Normal','123123412312345','543213214321321'),
               ('E Minor','Minor',5,'Normal','123123412312345','543213214321321'),
               ('G Minor','Minor',8,'Normal','123123412312345','543213214321321'),
               ('C Minor','Minor',1,'Normal','123123412312345','543213214321321'),
               ('A# Minor','Minor',11,'Cluster','212312341231234','213214321321432'), 
               ('D# Minor','Minor',4,'Cluster','212341231234123','212341231234123'),
               ('B Minor','Minor',12,'Cluster','123123412312345','432143213214321'),
               ('F Minor','Minor',6,'Cluster','123412312341234','543213214321321'),
               ('B# Minor','Minor',9,'Matching 3s','341231234123123','321432132143213'),
               ('C# Minor','Minor',2,'Matching 3s','341231234123123','321432132143213'),
               ('F# Minor','Minor',7,'Matching 34s','341231234123123','432132143213212')]

def populateKeyInfo():
    populateKeyQuery = """INSERT INTO `Key` (KeyName,MajorMinor,Tonic,Tip,RHFingering,LHFingering) 
    VALUES (%s, %s, %s, %s, %s, %s) """


    cursor.executemany(populateKeyQuery,keyRecords)
    db.commit()

def main():
    populateKeyInfo()

if __name__ == "__main__":
    main()