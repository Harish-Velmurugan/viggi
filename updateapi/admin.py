from django.contrib import admin

# Register your models here.
from .models import User_Professional,User_Personal,bids,User_Profile, ExpertPanel, ExpertHelp,CompanyApl
admin.site.register(User_Personal)
admin.site.register(User_Professional)
admin.site.register(bids)

admin.site.register(CompanyApl)

admin.site.register(User_Profile)
admin.site.register(ExpertPanel)
admin.site.register(ExpertHelp)
