from random import randint, choice, choices, uniform
from string import ascii_letters, digits
import names

import datetime

def dbString(x):
    return "'"+x+"'"

def GenerateLettersAndNumbersX(x):
    return ''.join(choices(ascii_letters+digits, k=x))

def GenerateLettersAndNumbers():
    return ''.join(choices(ascii_letters+digits, k=randint(10,50)))

def GenerateFirstName():
    return names.get_first_name()

def GenerateLastName():
    return names.get_last_name()

def generateWord():
    return ''.join(choices(ascii_letters, k=randint(5,20)))

def GenerateFloat():
    return uniform(0,12345678)

def generatePrice():
    return uniform(100,1000)

def generateId():
    return randint(1,10120)

def generatePosition():
    return choice(["Ankle", "Calf", "Chest", "Foot", "Fore Arm", "Forearm", "Full Back", "Full Sleeve", "Half Sleeve", "Hip", "Leg", "Lower Arm", "Other", "Ribs", "Sleeve Left", "Stomach", "Upper Arm", "Upper Back", "Wrist"])

def generateState():
    return choice(["abandoned", "canceled", "draft", "forfeit", "paid", "phase_one"])

def generateUserId():
    return randint(1,15)

def generateTimeStamp():

    x =  datetime.datetime(2021, randint(1,12), randint(1,20), randint(0,23), randint(0,59), randint(0,59), randint(0,2020))
# 2021-02-17 04:21:04.382964
    return dbString(x.strftime("%Y-%m-%d %H:%M:%S"))

def generateEmail():

    return generateWord()+"@"+generateWord()+choice([".ca",".com",".net"])

def generatePhonenumber():
    return randint(1000000000,9999999999)

def generateStyle():
    return choice(["Custom Script", "Don't Know / Other", "Realistic", "Blackwork", "Traditional", "Japanese", "New School", "Watercolor", "Illustrative"])

def generateSize():
    return choice(["Large", "Medium", "Full Sleeve", "Half Sleeve", "Small", "Extra Small", "Don't Know", "Extra Large"])

def genJobs():
    for _ in range(20):
        a=[
        generateId(),                     #id SERIAL
        dbString(generateWord()),                     #title                   
        dbString(generateWord()),                     #description             
        dbString(generatePosition()),                     #tattoo_position         
        generatePrice(),                     #price                   
        generatePrice(),                     #commission              
        dbString(generateState()),                   #state                   
        generateUserId(),                  #user_id                 
        generateTimeStamp(),                    #claimed_at              
        randint(0,50),              #bounty                  
        generateTimeStamp(),                    #introduction_sent_at    
        generateTimeStamp(),                    #approved_at             
        choice(["true", "false"]),  #featured                
        dbString(GenerateLettersAndNumbers()),                     #access_token            
        randint(0,10),              #designs_count           
        generateTimeStamp(),                    #last_customer_comment_at
        generateTimeStamp(),                    #last_design_sent_at     
        generateTimeStamp(),                    #deleted_at              
        generateTimeStamp(),                    #state_changed_at        
        generateTimeStamp(),                    #final_payment_at        
        generateTimeStamp(),                    #abandonded_at           
        generateTimeStamp(),                    #canceled_at             
        generateTimeStamp(),                    #forfeited_at            
        generateTimeStamp(),                    #last_featured_at        
        dbString(names.get_full_name()),      #customer                
        dbString(generateEmail()),                   #email                   
        generatePhonenumber(),                   #phone                   
        randint(0,50),              #tip                     
        dbString(generateStyle()),                   #style                   
        dbString(generateSize()),                    #size                    
        choice(["true","false"]),   #color                   
        generateTimeStamp(),                    #created_at              
        generateTimeStamp(),                    #updated_at              
        ]

        x = ""
        for i in a:
            x+=str(i)+","
        x.replace("Don't","Dont")
        print(x)
genJobs()

    









