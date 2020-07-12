import mysql.connector
import config
import argparse
import csv
import sys


db = mysql.connector.connect(
    host=config.DB_HOST,
    user=config.DB_USERNAME,
    passwd=config.DB_PASSWORD,
    database=config.DB_NAME
)

tableNames = ['Login', 'Pieces', 'Key', 'CompletedKeys', 'Profile']

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

userRecords = [['admin','admin','Colton', 'Gering'],
                ['test1','test1','test', 'test'],
                ['sponge','sponge', 'Spongebob', 'Squarepants'],
                ['patrick','patrick','Patrick','Star']]


def populateKeyInfo():
    populateKeyQuery = """INSERT INTO `Key` (KeyName,MajorMinor,Tonic,Tip,RHFingering,LHFingering) 
    VALUES (%s, %s, %s, %s, %s, %s) """

    try:
        cursor.executemany(populateKeyQuery,keyRecords)
        db.commit()
    except db.Error as err:
        print(err)

def populateUsers():
    for user in userRecords:
        print("Adding User: " + user[2])
        try:
            loginSQL = "INSERT INTO LOGIN(UserName, Password) VALUES ('{}','{}')".format(user[0], user[1])
            cursor.execute(loginSQL)
            id = cursor.lastrowid
            print('login')
            profileSQL = "INSERT INTO Profile (UserID, FirstName, LastName) VALUES ({},'{}','{}')".format(id, user[2],user[3])
            cursor.execute(profileSQL)
            print('profile')
            completedKeysSQL= "INSERT INTO CompletedKeys (UserID) VALUES ({});".format(id)
            cursor.execute(completedKeysSQL)
            print('completed keys')

        except mysql.connector.Error as err:
            print(err)
            print("ERROR: inserting failed, rolling back")
            db.rollback()

    db.commit()


def printReport():
    sql = 'SELECT Profile.UserID,FirstName,LastName,UserName FROM Profile JOIN Login ON Profile.UserID = Login.UserID WHERE Login.isDeleted = 0'
    cursor.execute(sql)
    data = cursor.fetchall()
    results=[]
    for i in data:
        l = list(i)
        id = l[0]
        sql2 = 'SELECT COUNT(*) FROM Pieces WHERE UserID={}'.format(id)
        cursor.execute(sql2)
        count = cursor.fetchone()
        l.append(count[0])
        results.append(l)

    writer = csv.writer(sys.stdout)
    hdrs = ['UserID', 'First Name', 'Last Name', 'User Name', '# of Pieces']
    writer.writerow(hdrs)
    for r in results:
        writer.writerow(r)

def printComposers():
    sql = 'SELECT Composer, COUNT(Composer) FROM Pieces GROUP BY Composer'
    cursor.execute(sql)
    data = cursor.fetchall()
    for r in data:
        print(r)

def listTables():
    print("\nhere are all tables in db: " + config.DB_NAME)
    cursor.execute("show tables;")
    results = cursor.fetchall()
    for r in results:
        print(r)

def printTables():
    for i in tableNames:
        print("\nTable:  " + i)
        sql = 'SELECT * FROM ' + i + ';'
        cursor.execute(sql)
        results = cursor.fetchall()
        for x in results:
            print(x)

def main():
    populateUsers()
    populateKeyInfo()
    printTables()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-p","--print",action="store_true", help="print current tables (does not insert new data)")
    parser.add_argument("-l","--list", action="store_true", help="list the tablenames in the database")
    parser.add_argument("-c","--composer", action="store_true", help="list count of pieces by each composer")
    parser.add_argument("-r","--report", action="store_true", help="print report of user info across multiple tables")
    parser.add_argument("-i", "--init", action="store_true",help="initialize tables with sample data")
    args = parser.parse_args()
    if args.print:
        printTables()
    elif args.list:
        listTables()
    elif args.report:
        printReport()
    elif args.composer:
        printComposers()
    elif args.init:
        main()