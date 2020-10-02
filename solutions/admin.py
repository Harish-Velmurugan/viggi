from django.contrib import admin

# Register your models here.
from .models import Solution, ExpertReview

from .models import Solution,CreateSurvey,SurveyQ,TakeSurvey,Choice

admin.site.register(Solution)
admin.site.register(ExpertReview)

admin.site.register(CreateSurvey)
admin.site.register(SurveyQ)
admin.site.register(TakeSurvey)
admin.site.register(Choice)
