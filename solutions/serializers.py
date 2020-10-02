from rest_framework import serializers
from .models import Solution, ExpertReview
from .models import Solution,CreateSurvey,SurveyQ,TakeSurvey,Choice

class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ('username', 'solutionId','problemId','title', 'desc', 'abstract', 'docs' , 'image', 'video', 'soln_date','voted_list','collaboration')


class SolutionSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = '__all__'        


class SolutionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ('username','solutionId','problemId','title', 'desc', 'abstract', 'docs','image','video','soln_date')


class ExpertReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertReview
        fields = '__all__'
class CreateSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateSurvey
        fields = '__all__'

class SurveyQSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyQ
        fields = '__all__'
class TakeSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = TakeSurvey
        fields = '__all__'

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__' 

# class PollSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Choice
#         fields = {'option','votes'}