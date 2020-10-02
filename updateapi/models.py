from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.models import CustomUser
from django.db.models import IntegerField, Model, CharField
from django_mysql.models import ListTextField,ListCharField



# Create your models here.
class User_Personal(models.Model):
    username = models.OneToOneField(to=CustomUser,on_delete=models.CASCADE)
    GENDER_CHOICES=[
        ('Male','Male'),
        ('Female','Female'),
        ('Other','Other')
    ]
    firstname=models.CharField(max_length=50)
    lastname=models.CharField(max_length=50,blank=True,null=True)
    gender=models.CharField(max_length=10,choices=GENDER_CHOICES,default='M',null=True)
    dob = models.DateField(auto_now_add=True,blank=True, null=True)
    nationality=models.CharField(max_length=50,null=True)
    phone=PhoneNumberField(null=True)
    img=models.ImageField(upload_to = 'uploads/')
    pin = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=50,null=True) 
   
    strength=models.CharField(max_length=50,null=True)
    

    
    domains=ListCharField(
        base_field=CharField(max_length=50),
        size=5,
        max_length=(5 * 21),
        null=True
        )
    
    domains=models.CharField((domains),max_length=250,null=True)


    displaydomains=ListCharField(
        base_field=CharField(max_length=50),
        size=5,
        max_length=(5 * 21),
        null=True)
    
    displaydomains=models.CharField((displaydomains),max_length=250,null=True)
    

class User_Professional(models.Model):
    username =  models.OneToOneField(to=CustomUser,on_delete=models.CASCADE)
    qualification=models.CharField(max_length=50,blank=True,null= True)
    specialization=models.CharField(max_length=50,blank=True,null= True)

    domains=ListCharField(
        base_field=CharField(max_length=50),
        size=5,
        max_length=(5 * 21),
        blank=True,null= True)
    
    domains=models.CharField((domains),max_length=250,blank=True,null= True)


    displaydomains=ListCharField(
        base_field=CharField(max_length=50),
        size=5,
        max_length=(5 * 21),blank=True,null= True)
    
    displaydomains=models.CharField((displaydomains),max_length=250,null= True,blank=True)

    work_exp=models.CharField(max_length=50,blank=True,null= True)

class bids(models.Model):
    pid = models.IntegerField()
    sid = models.IntegerField()
    uid = models.IntegerField()
    bids = models.IntegerField()

class User_Profile(models.Model):

    user = models.CharField(max_length=20, default="user")
    
    username = models.OneToOneField(to=CustomUser, on_delete=models.CASCADE)

    problems_interested= ListTextField(
        base_field=IntegerField(),
        blank = True,
        #null = True,
    )
    subscribedChannels = ListTextField(
        base_field=IntegerField(),
        blank=True,
        #null = True,
    )

    rp = models.IntegerField(default=100)
    notifyCount=models.IntegerField(default=0)

    fashion =  models.BooleanField(default = False)
    fmcg =  models.BooleanField(default = False)
    healthcare =  models.BooleanField(default = False)
    finance =  models.BooleanField(default = False)
    tt =  models.BooleanField(default = False)
    edu =  models.BooleanField(default = False)
    power =  models.BooleanField(default = False)
    med_ent =  models.BooleanField(default = False)
    sw =  models.BooleanField(default = False)
    hw =  models.BooleanField(default = False)
    infrastructure =  models.BooleanField(default = False)
    agriculture =  models.BooleanField(default = False)
    automobiles =  models.BooleanField(default = False)
    textile =  models.BooleanField(default = False)
    e_commerce =  models.BooleanField(default = False)
    art_sports =  models.BooleanField(default = False)
    gem =  models.BooleanField(default = False)
    pharmaceuticals =  models.BooleanField(default = False) 
    railways =  models.BooleanField(default = False) 
    food =  models.BooleanField(default = False)
    sci =  models.BooleanField(default = False)
    law=  models.BooleanField(default = False)
    trade =  models.BooleanField(default = False)  
    
    climate =  models.BooleanField(default = False)
    security =  models.BooleanField(default = False)
    
    eco_friendly = models.BooleanField(default = False) 
 
    jack = models.BooleanField(default = False) 
    striker = models.BooleanField(default = False) 
    astute = models.BooleanField(default = False)
    omnipotent= models.BooleanField(default = False) 
    salvo = models.BooleanField(default = False) 
    maestro = models.BooleanField(default = False) 
    hattricker = models.BooleanField(default = False)
    alpha = models.BooleanField(default = False)
    commando = models.BooleanField(default = False)
    solver = models.BooleanField(default = False)
    seeker = models.BooleanField(default = False)
    comrade = models.BooleanField(default = False)
    

    hatrick= models.IntegerField(default = 0)

    ast= models.IntegerField(default = 0)

    level = models.CharField(max_length=12 , default ='Bronze')



class ExpertPanel(models.Model): #expert list
    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    bucket = models.CharField(max_length=70)
    problem = models.BooleanField(default=False)
    remarks = models.IntegerField(default=5)
    solution = models.BooleanField(default=False)
    domains =ListCharField(base_field=CharField(max_length=50),size=10, max_length=1000)


class ExpertHelp(models.Model):
    username = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE) #seeker
    experts= ListTextField(
        base_field=IntegerField(),
        blank = True,
        #null = True,
    )
    choice = models.CharField(max_length=50) # false - problem , true - solution
    problem = models.IntegerField(default=0)
    payment = models.IntegerField(default=200)
    bucket = models.CharField(max_length=70)
    chat= models.CharField(max_length=70)
    completed = models.BooleanField(default=False)
    domains =ListCharField( base_field=CharField(max_length=50),size=10, max_length=1000, blank=True)


class CompanyApl(models.Model):
    username = models.CharField(max_length=50)
    code = models.IntegerField(blank=True, null=True)
    location=models.CharField(max_length=50)
    email=models.CharField(max_length=50)


   